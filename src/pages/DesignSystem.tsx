import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Copy, Check, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SessionCard } from "@/components/SessionCard";
import { TopicCard } from "@/components/TopicCard";
import { BookmarkCard } from "@/components/BookmarkCard";
import { sessionGroups } from "@/data/sessions";
import { topics } from "@/data/topics";
import { bookmarks } from "@/data/bookmarks";

// File location data for each component category
const atomFiles = [
  { name: "Button", path: "src/components/ui/button.tsx" },
  { name: "Badge", path: "src/components/ui/badge.tsx" },
  { name: "Input", path: "src/components/ui/input.tsx" },
  { name: "Label", path: "src/components/ui/label.tsx" },
  { name: "Checkbox", path: "src/components/ui/checkbox.tsx" },
  { name: "Switch", path: "src/components/ui/switch.tsx" },
  { name: "Slider", path: "src/components/ui/slider.tsx" },
  { name: "Avatar", path: "src/components/ui/avatar.tsx" },
  { name: "Progress", path: "src/components/ui/progress.tsx" },
  { name: "Separator", path: "src/components/ui/separator.tsx" },
  { name: "Textarea", path: "src/components/ui/textarea.tsx" },
];

const moleculeFiles = [
  { name: "Select", path: "src/components/ui/select.tsx" },
  { name: "Dropdown Menu", path: "src/components/ui/dropdown-menu.tsx" },
  { name: "Tooltip", path: "src/components/ui/tooltip.tsx" },
  { name: "Tabs", path: "src/components/ui/tabs.tsx" },
  { name: "Dialog", path: "src/components/ui/dialog.tsx" },
  { name: "Sheet", path: "src/components/ui/sheet.tsx" },
  { name: "Popover", path: "src/components/ui/popover.tsx" },
  { name: "Accordion", path: "src/components/ui/accordion.tsx" },
];

const organismFiles = [
  { name: "Card", path: "src/components/ui/card.tsx" },
  { name: "SessionCard", path: "src/components/SessionCard.tsx" },
  { name: "TopicCard", path: "src/components/TopicCard.tsx" },
  { name: "BookmarkCard", path: "src/components/BookmarkCard.tsx" },
  { name: "Header", path: "src/components/Header.tsx" },
  { name: "Sidebar", path: "src/components/Sidebar.tsx" },
  { name: "SessionList", path: "src/components/SessionList.tsx" },
  { name: "TopicsList", path: "src/components/TopicsList.tsx" },
  { name: "SettingsDialog", path: "src/components/SettingsDialog.tsx" },
];

const templateFiles = [
  { name: "Form Template", path: "src/pages/AuthScreen.tsx" },
  { name: "List Template", path: "src/components/SessionList.tsx" },
  { name: "Master-Detail (Sessions)", path: "src/pages/SessionsMasterDetail.tsx" },
  { name: "Master-Detail (Topics)", path: "src/pages/TopicsMasterDetail.tsx" },
];

const pageFiles = [
  { name: "Home", path: "src/pages/Index.tsx", route: "/" },
  { name: "Topics", path: "src/pages/Topics.tsx", route: "/topics" },
  { name: "Highlights", path: "src/pages/Bookmarks.tsx", route: "/bookmarks" },
  { name: "Settings", path: "src/pages/Settings.tsx", route: "/settings" },
  { name: "Session Detail", path: "src/pages/SessionDetail.tsx", route: "/session/:id" },
  { name: "Topic Detail", path: "src/pages/TopicDetail.tsx", route: "/topic/:id" },
  { name: "Welcome/Onboarding", path: "src/pages/Welcome.tsx", route: "/welcome" },
  { name: "Splash Screen", path: "src/pages/SplashScreen.tsx", route: "/splash" },
  { name: "Auth Screen", path: "src/pages/AuthScreen.tsx", route: "/auth" },
  { name: "Design System", path: "src/pages/DesignSystem.tsx", route: "/design-system" },
];

const FileLocationAccordion = ({ files, title }: { files: { name: string; path: string; route?: string }[], title: string }) => (
  <Accordion type="single" collapsible className="mb-6">
    <AccordionItem value="files" className="border-border">
      <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline py-2">
        <span className="flex items-center gap-2">
          <FileCode className="h-4 w-4" />
          {title} ({files.length} files)
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-2 pt-2">
          {files.map((file) => (
            <div key={file.path} className="flex items-center justify-between text-sm bg-muted/50 rounded-md px-3 py-2">
              <span className="font-medium">{file.name}</span>
              <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{file.path}</code>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

// Flatten sessions for display
const allSessions = sessionGroups.flatMap(group => group.sessions);

const DesignSystem = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorTokens = [
    { name: "background", variable: "--background", class: "bg-background" },
    { name: "foreground", variable: "--foreground", class: "bg-foreground" },
    { name: "card", variable: "--card", class: "bg-card" },
    { name: "card-foreground", variable: "--card-foreground", class: "bg-card-foreground" },
    { name: "primary", variable: "--primary", class: "bg-primary" },
    { name: "primary-foreground", variable: "--primary-foreground", class: "bg-primary-foreground" },
    { name: "secondary", variable: "--secondary", class: "bg-secondary" },
    { name: "secondary-foreground", variable: "--secondary-foreground", class: "bg-secondary-foreground" },
    { name: "muted", variable: "--muted", class: "bg-muted" },
    { name: "muted-foreground", variable: "--muted-foreground", class: "bg-muted-foreground" },
    { name: "accent", variable: "--accent", class: "bg-accent" },
    { name: "destructive", variable: "--destructive", class: "bg-destructive" },
    { name: "border", variable: "--border", class: "bg-border" },
    { name: "ring", variable: "--ring", class: "bg-ring" },
  ];

  const spacingScale = [
    { name: "0", value: "0px" },
    { name: "0.5", value: "2px" },
    { name: "1", value: "4px" },
    { name: "2", value: "8px" },
    { name: "3", value: "12px" },
    { name: "4", value: "16px" },
    { name: "5", value: "20px" },
    { name: "6", value: "24px" },
    { name: "8", value: "32px" },
    { name: "10", value: "40px" },
    { name: "12", value: "48px" },
    { name: "16", value: "64px" },
  ];

  const typographyScale = [
    { name: "xs", size: "12px", leading: "16px", class: "text-xs" },
    { name: "sm", size: "14px", leading: "20px", class: "text-sm" },
    { name: "base", size: "16px", leading: "24px", class: "text-base" },
    { name: "lg", size: "18px", leading: "28px", class: "text-lg" },
    { name: "xl", size: "20px", leading: "28px", class: "text-xl" },
    { name: "2xl", size: "24px", leading: "32px", class: "text-2xl" },
    { name: "3xl", size: "30px", leading: "36px", class: "text-3xl" },
    { name: "4xl", size: "36px", leading: "40px", class: "text-4xl" },
  ];

  const radiusScale = [
    { name: "sm", value: "calc(var(--radius) - 4px)", class: "rounded-sm" },
    { name: "md", value: "calc(var(--radius) - 2px)", class: "rounded-md" },
    { name: "lg", value: "var(--radius)", class: "rounded-lg" },
    { name: "xl", value: "0.75rem", class: "rounded-xl" },
    { name: "2xl", value: "1rem", class: "rounded-2xl" },
    { name: "full", value: "9999px", class: "rounded-full" },
  ];

  const shadowScale = [
    { name: "sm", class: "shadow-sm" },
    { name: "default", class: "shadow" },
    { name: "md", class: "shadow-md" },
    { name: "lg", class: "shadow-lg" },
    { name: "xl", class: "shadow-xl" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Design System</h1>
              <p className="text-sm text-muted-foreground">Hedy Component Library & Style Guide</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="foundations" className="w-full">
          <TabsList className="mb-8 flex-wrap h-auto gap-2">
            <TabsTrigger value="foundations">Sub-Atomic</TabsTrigger>
            <TabsTrigger value="atoms">Atoms</TabsTrigger>
            <TabsTrigger value="molecules">Molecules</TabsTrigger>
            <TabsTrigger value="organisms">Organisms</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>

          {/* SUB-ATOMIC / FOUNDATIONS */}
          <TabsContent value="foundations" className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-2">Sub-Atomic (Foundations)</h2>
              <p className="text-muted-foreground mb-4">Design tokens that form the foundation of our visual language.</p>
              
              <FileLocationAccordion 
                files={[
                  { name: "CSS Variables", path: "src/index.css" },
                  { name: "Tailwind Config", path: "tailwind.config.ts" },
                  { name: "Utils", path: "src/lib/utils.ts" },
                ]} 
                title="Foundation Files" 
              />
              
              {/* Color Palette */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🎨</span> Color Palette
                  </CardTitle>
                  <CardDescription>Semantic color tokens that adapt to light and dark themes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {colorTokens.map((token) => (
                      <button
                        key={token.name}
                        onClick={() => copyToClipboard(token.class, token.name)}
                        className="group text-left"
                      >
                        <div 
                          className={`h-16 rounded-lg border border-border ${token.class} mb-2 relative overflow-hidden`}
                        >
                          {copiedToken === token.name && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                              <Check className="h-4 w-4 text-primary" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-medium truncate">{token.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{token.variable}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">T</span> Typography
                  </CardTitle>
                  <CardDescription>Inter font family with consistent type scale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {typographyScale.map((type) => (
                    <div key={type.name} className="flex items-baseline gap-4 border-b border-border pb-4 last:border-0">
                      <code className="text-xs bg-muted px-2 py-1 rounded w-16 text-center">{type.class}</code>
                      <span className={`${type.class} text-foreground`}>The quick brown fox</span>
                      <span className="text-xs text-muted-foreground ml-auto">{type.size} / {type.leading}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Spacing */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📏</span> Spacing
                  </CardTitle>
                  <CardDescription>Consistent spacing scale based on 4px units</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {spacingScale.map((space) => (
                      <div key={space.name} className="flex items-center gap-4">
                        <code className="text-xs bg-muted px-2 py-1 rounded w-12 text-center">{space.name}</code>
                        <div 
                          className="h-4 bg-primary rounded" 
                          style={{ width: space.value }}
                        />
                        <span className="text-xs text-muted-foreground">{space.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Border Radius */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">⬜</span> Border Radius
                  </CardTitle>
                  <CardDescription>Rounded corner values for UI elements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-6">
                    {radiusScale.map((radius) => (
                      <div key={radius.name} className="text-center">
                        <div className={`w-16 h-16 bg-primary ${radius.class} mb-2`} />
                        <code className="text-xs">{radius.class}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shadows */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🌫️</span> Shadows
                  </CardTitle>
                  <CardDescription>Elevation levels for depth and hierarchy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-8">
                    {shadowScale.map((shadow) => (
                      <div key={shadow.name} className="text-center">
                        <div className={`w-20 h-20 bg-card rounded-lg ${shadow.class} mb-2`} />
                        <code className="text-xs">{shadow.class}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* ATOMS */}
          <TabsContent value="atoms" className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-2">Atoms</h2>
              <p className="text-muted-foreground mb-4">Basic building blocks that cannot be broken down further.</p>
              
              <FileLocationAccordion files={atomFiles} title="Atom Component Files" />

              {/* Buttons */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Interactive elements for actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">Variants</p>
                    <div className="flex flex-wrap gap-3">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon"><Copy className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">States</p>
                    <div className="flex flex-wrap gap-3">
                      <Button>Normal</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Labels and status indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Inputs */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Inputs</CardTitle>
                  <CardDescription>Text input fields</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="default">Default Input</Label>
                    <Input id="default" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled">Disabled Input</Label>
                    <Input id="disabled" placeholder="Disabled" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textarea">Textarea</Label>
                    <Textarea id="textarea" placeholder="Enter longer text..." />
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Controls</CardTitle>
                  <CardDescription>Interactive control elements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <Checkbox id="check1" />
                      <Label htmlFor="check1">Checkbox</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="switch1" />
                      <Label htmlFor="switch1">Switch</Label>
                    </div>
                  </div>
                  <div className="max-w-md">
                    <Label className="mb-2 block">Slider</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                </CardContent>
              </Card>

              {/* Avatar */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Avatar</CardTitle>
                  <CardDescription>User profile images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">JD</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                  <CardDescription>Progress indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-w-md">
                  <Progress value={25} />
                  <Progress value={50} />
                  <Progress value={75} />
                  <Progress value={100} />
                </CardContent>
              </Card>

              {/* Separator */}
              <Card>
                <CardHeader>
                  <CardTitle>Separator</CardTitle>
                  <CardDescription>Visual dividers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm mb-2">Horizontal</p>
                    <Separator />
                  </div>
                  <div className="flex items-center h-12 gap-4">
                    <p className="text-sm">Vertical</p>
                    <Separator orientation="vertical" />
                    <p className="text-sm text-muted-foreground">Separated content</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* MOLECULES */}
          <TabsContent value="molecules" className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-2">Molecules</h2>
              <p className="text-muted-foreground mb-4">Groups of atoms functioning together as a unit.</p>
              
              <FileLocationAccordion files={moleculeFiles} title="Molecule Component Files" />

              {/* Form Fields */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Form Fields</CardTitle>
                  <CardDescription>Label + Input combinations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                </CardContent>
              </Card>

              {/* Select */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Select</CardTitle>
                  <CardDescription>Dropdown selection fields</CardDescription>
                </CardHeader>
                <CardContent className="max-w-md">
                  <div className="space-y-2">
                    <Label>Select an option</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Dropdown Menu */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                  <CardDescription>Contextual action menus</CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              {/* Tooltip */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Tooltip</CardTitle>
                  <CardDescription>Hover information overlays</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle>Tabs</CardTitle>
                  <CardDescription>Tabbed navigation interface</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tab1" className="max-w-md">
                    <TabsList>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="p-4">Content for Tab 1</TabsContent>
                    <TabsContent value="tab2" className="p-4">Content for Tab 2</TabsContent>
                    <TabsContent value="tab3" className="p-4">Content for Tab 3</TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* ORGANISMS */}
          <TabsContent value="organisms" className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-2">Organisms</h2>
              <p className="text-muted-foreground mb-4">Complex UI components made of groups of molecules.</p>
              
              <FileLocationAccordion files={organismFiles} title="Organism Component Files" />

              {/* Cards */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>Container for related content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card description goes here</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">This is the card content area where you can place any content.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>With actions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Card with interactive elements.</p>
                        <div className="flex gap-2">
                          <Button size="sm">Action</Button>
                          <Button size="sm" variant="outline">Cancel</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Login Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Login Form</CardTitle>
                  <CardDescription>Complete authentication form organism</CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="max-w-sm">
                    <CardHeader>
                      <CardTitle>Sign In</CardTitle>
                      <CardDescription>Enter your credentials to continue</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" type="email" placeholder="name@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input id="login-password" type="password" placeholder="••••••••" />
                      </div>
                      <Button className="w-full">Login</Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Don't have an account? <a href="#" className="text-primary">Sign up</a>
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Session Card */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Session Card</CardTitle>
                  <CardDescription>Card displaying session information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md">
                    <SessionCard session={allSessions[0]} />
                  </div>
                </CardContent>
              </Card>

              {/* Topic Card */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Topic Card</CardTitle>
                  <CardDescription>Card displaying topic information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md">
                    <TopicCard topic={topics[0]} />
                  </div>
                </CardContent>
              </Card>

              {/* Bookmark Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Bookmark Card</CardTitle>
                  <CardDescription>Card displaying bookmark information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md">
                    <BookmarkCard bookmark={bookmarks[0]} />
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* TEMPLATES */}
          <TabsContent value="templates" className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-2">Templates</h2>
              <p className="text-muted-foreground mb-4">Page-level layouts that combine organisms into complete structures.</p>
              
              <FileLocationAccordion files={templateFiles} title="Template Files" />

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Form Template</CardTitle>
                  <CardDescription>Standard form layout pattern</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg p-6 max-w-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar>
                        <AvatarFallback>CO</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Company Name</h3>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <a href="#">Link</a>
                          <a href="#">Link</a>
                          <a href="#">Link</a>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Input label</Label>
                        <Input placeholder="text" />
                      </div>
                      <div className="space-y-2">
                        <Label>Input label</Label>
                        <Input placeholder="text" />
                      </div>
                      <Button className="w-full">Call to action</Button>
                      <p className="text-xs text-center text-muted-foreground">Additional links</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>List Template</CardTitle>
                  <CardDescription>Standard list layout with items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg overflow-hidden max-w-lg">
                    <div className="p-4 border-b border-border bg-muted/50">
                      <h3 className="font-semibold">List Header</h3>
                    </div>
                    <ScrollArea className="h-64">
                      <div className="divide-y divide-border">
                        {allSessions.slice(0, 5).map((session) => (
                          <div key={session.id} className="p-4 hover:bg-muted/50 cursor-pointer">
                            <p className="font-medium text-sm">{session.title}</p>
                            <p className="text-xs text-muted-foreground">{session.date}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Master-Detail Template</CardTitle>
                  <CardDescription>Two-panel layout for list + detail view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="grid md:grid-cols-[300px_1fr]">
                      <div className="border-r border-border">
                        <div className="p-4 border-b border-border bg-muted/50">
                          <h3 className="font-semibold text-sm">Items</h3>
                        </div>
                        <div className="divide-y divide-border">
                          {topics.slice(0, 3).map((topic, i) => (
                            <div 
                              key={topic.id} 
                              className={`p-4 cursor-pointer ${i === 0 ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                            >
                              <p className="font-medium text-sm">{topic.icon} {topic.name}</p>
                              <p className="text-xs text-muted-foreground">{topic.sessionCount} sessions</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{topics[0].icon} {topics[0].name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">Detail panel showing selected item content.</p>
                        <div className="flex gap-2">
                          <Button size="sm">Edit</Button>
                          <Button size="sm" variant="outline">Share</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* PAGES */}
          <TabsContent value="pages" className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-2">Pages</h2>
              <p className="text-muted-foreground mb-4">Complete page examples combining all atomic design levels.</p>
              
              <FileLocationAccordion files={pageFiles} title="Page Files" />

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Available Pages</CardTitle>
                  <CardDescription>Click to navigate to each page</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Link to="/">
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Home</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Main dashboard with sessions overview</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link to="/topics">
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Topics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Browse all topics</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link to="/bookmarks">
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Highlights</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Saved highlights and bookmarks</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link to="/settings">
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">App preferences and configuration</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link to="/session/1">
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Session Detail</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Individual session view</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link to="/topic/1">
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Topic Detail</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Individual topic view</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link to="/welcome">
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Welcome / Onboarding</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Intro and onboarding flow</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Page Example</CardTitle>
                  <CardDescription>Complete page composition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg overflow-hidden max-w-sm mx-auto">
                    <div className="bg-card p-6">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="font-semibold">Hedy</span>
                      </div>
                      <h2 className="text-xl font-bold mb-6">Login</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Email</Label>
                          <Input placeholder="rohan@email.com" className="h-9 text-sm" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Password</Label>
                          <Input type="password" placeholder="••••••" className="h-9 text-sm" />
                        </div>
                        <Button className="w-full h-9 text-sm">Login</Button>
                        <p className="text-xs text-center text-muted-foreground">Additional links</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-sm font-medium">Rohan</span>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <a href="#">Medium</a>
                          <a href="#">Twitter</a>
                          <a href="#">LinkedIn</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystem;
