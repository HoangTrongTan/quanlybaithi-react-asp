using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Webquanlybaithi.Entities;

public partial class Lydo
{
    public int? IdFiles { get; set; }

    public string? Noidung { get; set; }

    public int Id { get; set; }
    [JsonIgnore]
    public virtual FilesUp? IdFilesNavigation { get; set; }
}
