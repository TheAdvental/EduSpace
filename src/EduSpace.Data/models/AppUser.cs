using Microsoft.AspNetCore.Identity;

namespace EduSpace.Data.models;

public abstract class AppUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
    public string? AvatarPath { get; set; }
    public string UserType { get; set; }
}

