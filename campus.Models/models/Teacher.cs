using Models.interfaces;

namespace Models;

public class Teacher : Entity, IHasRole
{
    public Roles Role { get; init; }
}
    


