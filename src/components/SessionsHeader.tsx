import { useState } from 'react';
import { Search, SlidersHorizontal, RefreshCw, Plus, ChevronDown, FileAudio, PlayCircle, FileText } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SessionsHeaderProps {
  totalSessions: number;
}

export function SessionsHeader({ totalSessions }: SessionsHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-foreground">Sessions</h1>
        <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
          {totalSessions}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Select
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
              <FileAudio className="h-5 w-5" />
              <span>Create Session from Audio File</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
              <PlayCircle className="h-5 w-5" />
              <span>Import from YouTube</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
              <FileText className="h-5 w-5" />
              <span>Create Session from Transcript</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
