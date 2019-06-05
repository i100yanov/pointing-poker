using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Poker.Model;
using Poker.Model.User;
using Poker.Service.Interfaces;
using Poker.WebApi.Settings;

namespace Poker.WebUI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("authentication")]
    public class AuthenticationController : Controller
    {
        #region -- private readonly fields --

        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;

        private readonly AppSettings _appSettings;
        #endregion

        #region -- constructor --

        public AuthenticationController(IAuthenticationService authenticationService, 
                                        IUserService userService, IOptions<AppSettings> appSettings)
        {
            _authenticationService = authenticationService;
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        #endregion

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginModel loginData)
        {
            try
            {
                if (string.IsNullOrEmpty(loginData.Username) || string.IsNullOrEmpty(loginData.Password))
                {
                    return StatusCode(401);
                }

                string token = _authenticationService.Authenticate(loginData.Username.Trim(), loginData.Password.Trim(), _appSettings.Secret);

                if (string.IsNullOrEmpty(token))
                {
                    return BadRequest();
                }

                UserModel model = _userService.Get(loginData.Username.Trim());

                return Ok(token);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}