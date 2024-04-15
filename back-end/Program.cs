using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Responsitories;
using Webquanlybaithi.Respositories;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<WebQuanlybaithiContext>(
    option => option.UseSqlServer(builder.Configuration.GetConnectionString("WebQuanlybaithi"))
);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                ValidateIssuerSigningKey = true,
            }
        );
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options =>
        {
            options.LoginPath = "/TaiKhoan/login";
            options.LogoutPath = "/Account/Logout";
        }
        );
builder.Services.AddCors( p => p.AddPolicy("MyCors", build =>
{
    //build.WithOrigins("https://hienlth.info", "https://localhost:3000");
    build.AllowAnyOrigin()
         .AllowAnyHeader()
         .AllowAnyMethod();
} )) ;
builder.Services.AddScoped<IKhoaRespositories, KhoaRespositories>();
builder.Services.AddScoped<IKhoaDKRespositories, KhoaDkRespositories>();
builder.Services.AddScoped<ILopRespositories, LopRespositories>();
builder.Services.AddScoped<IHocPhanRespositories, HocPhanRespositories>();
builder.Services.AddScoped<ITaiKhoanRespositories, TaiKhoanRespositories>();
builder.Services.AddScoped<IFilesRespositories, FilesRespositories>();
builder.Services.AddScoped<IMonHocKhoaRespositories, MonHocKhoaRespositories>();
builder.Services.AddScoped<IMonHocKhoaRespositories, MonHocKhoaRespositories>();
builder.Services.AddScoped<ILyDoRespositories, LyDoRespositories>();


builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit =500000000; // Giới hạn kích thước tệp đính kèm lên (1gb)
});

builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = 500000000; // Giới hạn kích thước request body (1gb)
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}
//Add jwt authentication
app.UseAuthentication();
//
//Static files
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
    RequestPath = "/contents"
});
//
app.Use(async (context, next) =>
{
    context.Features.Get<IHttpMaxRequestBodySizeFeature>().MaxRequestBodySize = null;
    await next.Invoke();
});

app.UseHttpsRedirection();
app.UseCors("MyCors");
app.UseAuthorization();

app.MapControllers();

app.Run();
