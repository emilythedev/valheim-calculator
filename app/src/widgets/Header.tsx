import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';

const content = [
  {
    title: 'Disclaimer',
    content: 'This website is fan-made for the game Valheim and is not affiliated with Iron Gate Studio or its partners. The information provided on this website is based on publicly available knowledge and may contain errors or omissions. The website and its creators are not responsible for any damages or losses resulting from the use of this information.',
  },
  {
    title: 'Privacy Policy',
    content: 'This website does not collect any personal user data. All information used by the crafting calculator is stored locally on your device and is not transmitted or shared with any third party.',
  },
  {
    title: 'Terms of Service',
    content: 'By using this website, you agree to use it for personal, non-commercial purposes. You agree not to use the website in any way that could harm, disable, or impair the website or interfere with any other user\'s use of the website.',
  },
  {
    title: 'Copyright',
    content: 'All game content, including but not limited to images, logos, and game mechanics, is the property of Iron Gate Studio. This website uses fair use guidelines to provide a crafting calculator as a tool for players.',
  }
];

const AboutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="ghost">About</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About Valheim Calc</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="space-y-12">
          <p className="text-sm leading-normal tracking-wide">
            You can quickly and easily calculate the resources needed for any item in Valheim using Valheim Calc. Whether you're building a base or crafting a set of armors, this tool will help you plan your crafting efficiently.
          </p>
          {content.map(({ title, content }) => {
            return (
              <div key={title} className="space-y-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm leading-normal tracking-wide">{content}</p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Header = () => {
  return (
    <div className="flex items-center gap-4 py-12">
      <h1 className="text-xl font-bold">Valheim Calc</h1>
      <AboutDialog />
    </div>
  );
};

export default Header;
