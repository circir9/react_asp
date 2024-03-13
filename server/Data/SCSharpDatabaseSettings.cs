namespace SCSharpMongoConfig.Data;

public class SCSharpDatabaseSettings
{
    public string ConnectionString { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = string.Empty;
    public string VisitorCollectionName { get; set; } = string.Empty;
}