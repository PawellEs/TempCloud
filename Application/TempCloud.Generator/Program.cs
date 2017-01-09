using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TempCloud.Generator
{
    class Program
    {
        static void Main(string[] args)
        {
            var mainEvent = new MainGenerator();
            mainEvent.Start();
            Console.ReadLine();
        }
    }
}
