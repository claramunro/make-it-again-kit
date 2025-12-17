import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Pro: Story = {
  args: {
    variant: 'pro',
    children: 'PRO',
  },
};

export const WithEmoji: Story = {
  args: {
    variant: 'secondary',
    children: '🎨 Design',
  },
};

export const Status: Story = {
  args: {
    children: 'Status',
  },
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Default:</span>
        <Badge>Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Secondary:</span>
        <Badge variant="secondary">Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Destructive:</span>
        <Badge variant="destructive">Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Outline:</span>
        <Badge variant="outline">Badge</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground w-24">Pro:</span>
        <Badge variant="pro">PRO</Badge>
      </div>
    </div>
  ),
};
