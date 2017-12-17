using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Game2.Startup))]
namespace Game2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
