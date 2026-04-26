namespace Models;

public abstract class Entity
{
    public Guid Id { get; }
    public string FullName { get; private set; }
}
    
