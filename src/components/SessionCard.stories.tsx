import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { SessionCard } from './SessionCard';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/SessionCard',
  component: SessionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-[400px]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  args: {
    onToggleFavorite: fn(),
  },
} satisfies Meta<typeof SessionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    session: {
      id: '1',
      title: 'Product Roadmap Planning Q1 2026',
      badge: 'new',
      time: '2:30 PM',
      duration: '45 minutes',
      date: 'Nov 4, 2025',
      type: 'document',
      isFavorite: false,
    },
  },
};

export const Favorited: Story = {
  args: {
    session: {
      id: '2',
      title: 'Design Review: Mobile App Refresh',
      badge: 'workout',
      time: '2:00 PM',
      duration: '55 minutes',
      date: 'Oct 22, 2025',
      type: 'video',
      isFavorite: true,
    },
  },
};

export const Selected: Story = {
  args: {
    session: {
      id: '3',
      title: 'Weekly Team Standup - Engineering',
      badge: 'new',
      time: '10:00 AM',
      duration: '25 minutes',
      date: 'Oct 22, 2025',
      type: 'document',
      isFavorite: false,
    },
    isSelected: true,
    onSelect: fn(),
  },
};

export const VideoType: Story = {
  args: {
    session: {
      id: '4',
      title: 'Quarterly Business Review',
      badge: 'new',
      time: '9:00 AM',
      duration: '90 minutes',
      date: 'Oct 15, 2025',
      type: 'video',
      isFavorite: false,
    },
  },
};

export const CoffeeBadge: Story = {
  args: {
    session: {
      id: '5',
      title: 'Short Meeting with Robert Baratheon',
      badge: 'coffee',
      time: '7:16 PM',
      duration: '1 minutes',
      date: 'Oct 29, 2025',
      type: 'document',
      isFavorite: false,
    },
  },
};

export const NoBadge: Story = {
  args: {
    session: {
      id: '6',
      title: 'Marketing Strategy Discussion',
      badge: null,
      time: '1:00 PM',
      duration: '40 minutes',
      date: 'Oct 15, 2025',
      type: 'document',
      isFavorite: false,
    },
  },
};

export const LongTitle: Story = {
  args: {
    session: {
      id: '7',
      title: 'Innovative Affordable Housing and Development Strategies (Ep. 27: Tour of "Atomic Orchard Experiment" (in Portland) // The Essential Housing Campaign)',
      badge: 'new',
      time: '4:58 PM',
      duration: '12 minutes',
      date: 'Nov 4, 2025',
      type: 'video',
      isFavorite: true,
    },
  },
};
