public class RegisterDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string UserType { get; set; } = string.Empty; 

    
    public string? StudentTicketNumber { get; set; }
    public int? GroupId { get; set; }

    public string? Department { get; set; }
    public string? ScientificDegree { get; set; }
}
   