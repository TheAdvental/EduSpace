
using Models.interfaces;
using Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace campus.Models.Discriminator;

public class ApplicationDBContext : IdentityDbContext<Entity>
{
    
}

