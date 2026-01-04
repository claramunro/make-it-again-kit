import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { HighlightCard } from './HighlightCard';

const meta = {
  title: 'Components/HighlightCard',
  component: HighlightCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-[450px]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof HighlightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    highlight: {
      id: '1',
      datetime: 'Oct 29 7:17 PM',
      timestamp: '00:46',
      sessionId: 'session-1',
      sessionTitle: 'Short Meeting with Robert Baratheon',
      topicId: '1',
      topicName: 'Hedy Redesign',
      topicIcon: '🎨',
      title: 'Session Activation Successfully Achieved',
      description: 'The core idea is the successful activation and confirmation of a live session, marked by a moment of recognition and celebration.',
      isFavorite: false,
    },
  },
};

export const Favorited: Story = {
  args: {
    highlight: {
      id: '2',
      datetime: 'Oct 29 7:16 PM',
      timestamp: '00:39',
      sessionId: 'session-1',
      sessionTitle: 'Short Meeting with Robert Baratheon',
      topicId: '1',
      topicName: 'Hedy Redesign',
      topicIcon: '🎨',
      title: 'Unclear Communication Disrupts Meeting Flow',
      description: 'During the meeting, fragmented and seemingly random language was used, potentially indicating confusion, technical difficulties, or a breakdown in clear communication.',
      isFavorite: true,
    },
  },
};

export const LongDescription: Story = {
  args: {
    highlight: {
      id: '3',
      datetime: 'Oct 22 2:15 PM',
      timestamp: '12:34',
      sessionId: 'session-2',
      sessionTitle: 'Design Review: Mobile App Refresh',
      topicId: '1',
      topicName: 'Hedy Redesign',
      topicIcon: '🎨',
      title: 'Navigation Patterns Need Rethinking',
      description: 'The team identified that current navigation patterns are causing user confusion, particularly on mobile devices. A proposal was made to adopt a bottom tab navigation approach similar to industry-leading apps. This change would significantly improve user experience and reduce cognitive load for new users.',
      isFavorite: false,
    },
  },
};

export const DifferentTopic: Story = {
  args: {
    highlight: {
      id: '4',
      datetime: 'Oct 15 9:30 AM',
      timestamp: '28:45',
      sessionId: 'session-3',
      sessionTitle: 'Quarterly Business Review',
      topicId: '4',
      topicName: 'Working Out',
      topicIcon: '🏋️',
      title: 'Revenue Growth Exceeded Expectations',
      description: 'Q3 revenue came in 15% above projections, driven primarily by enterprise customer expansion. The sales team highlighted key wins including three Fortune 500 companies.',
      isFavorite: false,
    },
  },
};