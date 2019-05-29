using System;
using Microsoft.AspNetCore.Mvc;
using Poker.Model.User;
using Poker.Service.Interfaces;
using Poker.WebApi.RestModels;

namespace Poker.WebUI.Controllers
{
    [Produces("application/json")]
    [Route("authentication")]
    public class AuthenticationController : Controller
    {
        #region -- private readonly fields --

        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;

        #endregion

        #region -- constructor --

        public AuthenticationController(IAuthenticationService authenticationService, 
                                        IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        #endregion

        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginData loginData)
        {
            try
            {
/*
                if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                {
                    return StatusCode(401);
                }
*/
                string token = _authenticationService.Authenticate(loginData.Username.Trim(), loginData.Password.Trim());

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