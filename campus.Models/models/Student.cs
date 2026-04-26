using Models.interfaces;

namespace Models;

public class Student : Entity, IHasRole
{
    public Roles Role { get; init; }
    public Guid Id { get; init; }
    public string FullName { get; private set; } = string.Empty;
    public Faculties Faculty { get; private set; }
}