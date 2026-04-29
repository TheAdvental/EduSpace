using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using EduSpace.Data.models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;


namespace EduSpace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<AppUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

   
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        AppUser user;

        if (dto.UserType == "Student")
        {
            user = new Student
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.FullName,
                StudentTicketNumber = dto.StudentTicketNumber ?? "",
                GroupId = dto.GroupId ?? 0
            };
        }
        else if (dto.UserType == "Teacher")
        {
            user = new Teacher
            {
                UserName = dto.Email,
                Email = dto.Email,
                FullName = dto.FullName,
                Department = dto.Department ?? "",
                ScientificDegree = dto.ScientificDegree ?? ""
            };
        }
        else
        {
            return BadRequest("Невідомий тип користувача");
        }

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (result.Succeeded)
        {
            return Ok(new { message = $"{dto.UserType} успішно зареєстрований!" });
        }

        return BadRequest(result.Errors);
    }

    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
        {
            return Unauthorized("Неправильний email або пароль.");
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim("UserType", user.UserType)
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds
        );

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            userType = user.UserType
        });
    }
}
