using Microsoft.IdentityModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Globalization;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;

namespace TempCloud.WebApi.Providers
{
    public class CustomJwtTokenHandler : JwtSecurityTokenHandler
    {
        public CustomJwtTokenHandler() : base()
        {

        }
        public override bool CanReadToken(string tokenString)
        {
            var rtn = base.CanReadToken(tokenString);
            return rtn;
        }
        public override bool CanValidateToken
        {
            get
            {
                return base.CanValidateToken;
            }
        }

        protected override ClaimsIdentity CreateClaimsIdentity(JwtSecurityToken jwt, string issuer, TokenValidationParameters validationParameters)
        {
            return base.CreateClaimsIdentity(jwt, issuer, validationParameters);
        }
        public override ReadOnlyCollection<ClaimsIdentity> ValidateToken(SecurityToken token)
        {
            try
            {
                var rtn = base.ValidateToken(token);
                return rtn;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public override ClaimsPrincipal ValidateToken(string securityToken, TokenValidationParameters validationParameters, out SecurityToken validatedToken)
        {
            try
            {
                var jwt = this.ValidateSignature(securityToken, validationParameters);
                if (validationParameters.ValidateAudience)
                {
                    if (validationParameters.AudienceValidator != null)
                    {
                        if (!validationParameters.AudienceValidator(jwt.Audiences, jwt, validationParameters))
                        {
                            throw new SecurityTokenInvalidAudienceException(string.Format(CultureInfo.InvariantCulture, ErrorMessages.IDX10231, jwt.ToString()));
                        }
                    }
                    else
                    {
                        base.ValidateAudience(validationParameters.ValidAudiences, jwt, validationParameters);
                    }
                }

                string issuer = jwt.Issuer;
                if (validationParameters.ValidateIssuer)
                {
                    if (validationParameters.IssuerValidator != null)
                    {
                        issuer = validationParameters.IssuerValidator(issuer, jwt, validationParameters);
                    }
                    else
                    {
                        issuer = ValidateIssuer(issuer, jwt, validationParameters);
                    }
                }

                if (validationParameters.ValidateActor && !string.IsNullOrWhiteSpace(jwt.Actor))
                {
                    SecurityToken actor = null;
                    ValidateToken(jwt.Actor, validationParameters, out actor);
                }

                ClaimsIdentity identity = this.CreateClaimsIdentity(jwt, issuer, validationParameters);
                if (validationParameters.SaveSigninToken)
                {
                    identity.BootstrapContext = new BootstrapContext(securityToken);
                }

                validatedToken = jwt;
                return new ClaimsPrincipal(identity);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("JWT EXCEPTION: " + ex);
                throw;
            }
        }

        protected override JwtSecurityToken ValidateSignature(string token, TokenValidationParameters validationParameters)
        {
            var rtn = base.ValidateSignature(token, validationParameters);
            var issuer = rtn.Issuer;

            return rtn;
        }
        protected override void ValidateAudience(IEnumerable<string> audiences, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (audiences != null && audiences.Any())
            {
                var jwt = securityToken as JwtSecurityToken;
                if (!jwt.Audiences.Any())
                {
                    throw new Exception("token has no audiences defined");
                }
                var inBothList = audiences.Where(X => jwt.Audiences.Contains(X)).ToList();
                if (!inBothList.Any())
                {
                    throw new Exception("token not in audience list");
                }

            }
            //base.ValidateAudience(audiences, securityToken, validationParameters);
        }


        public override SecurityToken ReadToken(string tokenString)
        {
            var rtnToken = base.ReadToken(tokenString);
            //var validations = this.ValidateToken(rtnToken);
            return rtnToken;
        }
    }
}