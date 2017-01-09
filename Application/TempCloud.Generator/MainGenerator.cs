using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;

namespace TempCloud.Generator
{
    public class MainGenerator
    {
        private BackgroundWorker _monitor;

        public void Start()
        {
            Console.WriteLine(DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + " Program starting");
            _monitor = new BackgroundWorker();
            _monitor.DoWork += RunMonitor;
            _monitor.WorkerSupportsCancellation = true;
            _monitor.RunWorkerAsync();
        }

        private void RunMonitor(object sender, DoWorkEventArgs e)
        {
            var bw = (BackgroundWorker)sender;
            while (!bw.CancellationPending)
            {
                try
                {
                    List<ControllerStatusViewModel> statuses = new List<ControllerStatusViewModel>();
                    Random rand = new Random();
                    for (int i = 10; i < 26; i++)
                    {
                        ControllerStatusViewModel status = new ControllerStatusViewModel();
                        if (i < 18)
                        {
                            status.DeviceId = 6;
                        }
                        else
                        {
                            status.DeviceId = 7;
                        }

                        status.SystemDateTime = DateTime.Now;
                        status.TypeId = 1;
                        status.Value = rand.Next(0, 17);
                        statuses.Add(status);
                    }

                    //int error = RandomLogError();
                    //statuses[error].Value = 0;
                    SendStatus(statuses);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error :" + ex);
                    //Log.Error("Error during save log:" + ex);
                    Thread.Sleep(1);
                }
                Thread.Sleep(1000 * 60 * 60);
            }
        }

        private int RandomLogError()
        {
            Random rand = new Random();
            int error = rand.Next(0, 15);
            return error;
        }

        private void SendStatus(List<ControllerStatusViewModel> list)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:53662/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                //client.DefaultRequestHeaders.Add("api_key", token);

                var content = new StringContent(JsonConvert.SerializeObject(list));
                Console.WriteLine(DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + "Sending Statuses Changes");
                var result = client.PostAsync("/device/updateStatusList", content).Result;
                Console.WriteLine(result);
            }
        }
    }
}
