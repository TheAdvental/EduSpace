
namespace Models.interfaces;

public abstract class Entity
{
    public Guid Id { get; }
    public string FullName { get; private set; }
    public Faculties Faculty { get; private set; }
}





