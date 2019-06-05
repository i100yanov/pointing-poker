using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Poker.Service.Interfaces;
using Poker.WebApi.Settings;

namespace Poker.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();
            Registry.Register(services, Configuration.GetConnectionString("DefaultConnectionString"));

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
                    {
                        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                .AddJwtBearer(x =>
                    {
                        x.Events = new JwtBearerEvents
                                       {
                                           OnTokenValidated = context =>
                                               {
                                                   var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                                                   var user = userService.Get(context.Principal.Identity.Name);
                                                   if (user == null)
                                                   {
                                                       // return unauthorized if user no longer exists
                                                       context.Fail("Unauthorized");
                                                   } else
                                                   {
                                                       context.Success();
                                                   }
                                                   return Task.CompletedTask;
                                               }
                                       };
                        x.RequireHttpsMetadata = false;
                        x.RequireHttpsMetadata = false;
                        x.SaveToken = true;
                        x.TokenValidationParameters = new TokenValidationParameters
                                                          {
                                                              ValidateIssuerSigningKey = true,
                                                              IssuerSigningKey = new SymmetricSecurityKey(key),
                                                              ValidateIssuer = false,
                                                              ValidateAudience = false
                                                          };
                    });

            //services.ConfigureApplicationCookie(
            //    options =>
            //        {
            //            options.LoginPath = "/authentication/login";
            //            options.LogoutPath = "/authentication/logoff";
            //        });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseMvc();
            app.UseAuthentication();
        }
    }
}
