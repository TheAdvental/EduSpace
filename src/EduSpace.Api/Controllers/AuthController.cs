using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using EduSpace.Data.models;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    public AuthController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
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
}
       