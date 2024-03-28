using Microsoft.EntityFrameworkCore;

public class AppDbContext:DbContext{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options){

    }

    public DbSet<Upload_file> Upload_files { get; set; }
}