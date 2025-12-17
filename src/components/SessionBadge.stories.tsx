import type { Meta, StoryObj } from '@storybook/react-vite';
import { SessionBadge } from './SessionBadge';

const meta = {
  title: 'Components/SessionBadge',
  component: SessionBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SessionBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
  args: {
    type: 'new',
  },
};

export const Coffee: Story = {
  args: {
    type: 'coffee',
  },
};

export const Workout: Story = {
  args: {
    type: 'workout',
  },
};

export const NoBadge: Story = {
  args: {
    type: null,
  },
};

export const AllTypes: Story = {
  args: {
    type: 'new',
  },
  render: () => (
    <div className="flex gap-3 items-center">
      <SessionBadge type="new" />
      <SessionBadge type="coffee" />
      <SessionBadge type="workout" />
    </div>
  ),
};
