using Models.interfaces;

namespace Models;

public class Student : Entity, IHasRole
{
    public Roles Role { get; init; }
}


