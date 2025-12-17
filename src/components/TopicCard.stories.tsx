import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { TopicCard, TopicCardSelectable } from './TopicCard';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/TopicCard',
  component: TopicCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-[350px]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof TopicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    topic: {
      id: '1',
      name: 'Hedy Redesign',
      icon: '🎨',
      sessionCount: 10,
      date: 'Dec 1',
      isFavorite: false,
      sessions: [
        { id: 's1', title: 'Design Review: Mobile App Refresh', date: 'Oct 22', duration: '45 min' },
        { id: 's2', title: 'UI Component Library Planning', date: 'Oct 20', duration: '30 min' },
      ],
    },
  },
};

export const Favorited: Story = {
  args: {
    topic: {
      id: '2',
      name: 'Product Launch',
      icon: '🚀',
      sessionCount: 8,
      date: 'Oct 10',
      isFavorite: true,
      sessions: [
        { id: 's12', title: 'Launch Timeline Review', date: 'Oct 10', duration: '55 min' },
        { id: 's13', title: 'Marketing Coordination', date: 'Oct 8', duration: '40 min' },
      ],
    },
  },
};

export const WithSharedBy: Story = {
  args: {
    topic: {
      id: '3',
      name: 'Customer Success',
      icon: '🤝',
      sessionCount: 12,
      date: 'Oct 3',
      sharedBy: 'Sarah',
      isFavorite: false,
      sessions: [
        { id: 's18', title: 'Customer Feedback Analysis', date: 'Oct 3', duration: '40 min' },
        { id: 's19', title: 'Support Ticket Review', date: 'Oct 1', duration: '30 min' },
      ],
    },
  },
};

export const FewSessions: Story = {
  args: {
    topic: {
      id: '4',
      name: 'Legal',
      icon: '⚖️',
      sessionCount: 2,
      date: 'Sep 20',
      isFavorite: false,
      sessions: [
        { id: 's26', title: 'Contract Review', date: 'Sep 20', duration: '35 min' },
      ],
    },
  },
};

export const ManySessions: Story = {
  args: {
    topic: {
      id: '5',
      name: 'Engineering',
      icon: '💻',
      sessionCount: 15,
      date: 'Oct 8',
      description: 'Technical discussions and sprint planning',
      isFavorite: false,
      sessions: [
        { id: 's14', title: 'Sprint Retrospective', date: 'Oct 8', duration: '45 min' },
        { id: 's15', title: 'Architecture Discussion', date: 'Oct 5', duration: '60 min' },
      ],
    },
  },
};

// Selectable variant stories
const selectableMeta = {
  title: 'Components/TopicCardSelectable',
  component: TopicCardSelectable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <BrowserRouter>
        <div className="w-[300px]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof TopicCardSelectable>;

export const SelectableDefault: StoryObj<typeof TopicCardSelectable> = {
  render: (args) => <TopicCardSelectable {...args} />,
  args: {
    topic: {
      id: '1',
      name: 'Hedy Redesign',
      icon: '🎨',
      sessionCount: 10,
      date: 'Dec 1',
      isFavorite: false,
    },
    isSelected: false,
    onSelect: fn(),
  },
};

export const SelectableSelected: StoryObj<typeof TopicCardSelectable> = {
  render: (args) => <TopicCardSelectable {...args} />,
  args: {
    topic: {
      id: '2',
      name: 'Product Launch',
      icon: '🚀',
      sessionCount: 8,
      date: 'Oct 10',
      isFavorite: true,
    },
    isSelected: true,
    onSelect: fn(),
  },
};
