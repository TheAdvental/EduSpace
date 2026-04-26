using Microsoft.AspNetCore.Identity;

namespace Models.interfaces;

public abstract class Entity : IdentityUser
{
    public Guid Guid { get; init; }
    public string FullName { get; private set; } = string.Empty;
    public Faculties Faculty { get; private set; }
}







