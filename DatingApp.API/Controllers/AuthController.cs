using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserToRegisterDto userToRegisterDto)
        {
            // validate the request

            // change to lower case to make username not redundant
            userToRegisterDto.Username = userToRegisterDto.Username.ToLower();

            // check if the username exists
            if(await _repo.UserExists(userToRegisterDto.Username))
                return BadRequest("Username already exists");

            // create a user instance
            var userToCreate = new User
            {
                Username = userToRegisterDto.Username
            };

            // register using the "register" method in auth repository
            var createdUser = await _repo.Register(userToCreate, userToRegisterDto.Password);

            return StatusCode(201);

        }


    }
}