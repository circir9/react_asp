namespace VisitorManager.Models;

public class Visitor
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _id { get; set; } = string.Empty;

    [BsonElement("visitor_name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("visitor_message")]
    public string Message { get; set; } = string.Empty;
}

public class VisitorUpdateModel
{
    public string Name { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public class VisitorCreateModel
{
    public string Name { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}