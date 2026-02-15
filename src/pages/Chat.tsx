import { useState } from 'react';
import { mockChats, mockUsers } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Send, ArrowLeft, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Chat = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || '1';
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedChat = mockChats.find(c => c.id === selectedChatId);

  const getOtherParticipant = (chat: typeof mockChats[0]) => {
    return chat.participants.find(p => p.id !== currentUserId) || chat.participants[0];
  };

  const getLastMessage = (chat: typeof mockChats[0]) => {
    return chat.messages[chat.messages.length - 1];
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredChats = mockChats.filter(c => {
    if (!searchQuery) return true;
    const other = getOtherParticipant(c);
    return other.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Chat list view
  const ChatList = () => (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Pesquisar conversas..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => {
          const other = getOtherParticipant(chat);
          const last = getLastMessage(chat);
          return (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                {other.name.charAt(0)}{other.name.split(' ')[1]?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground truncate">{other.name}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{formatTime(last.created_at)}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {last.sender_id === currentUserId ? 'Você: ' : ''}{last.content}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Chat room view
  const ChatRoom = () => {
    if (!selectedChat) return null;
    const other = getOtherParticipant(selectedChat);

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
          <button onClick={() => setSelectedChatId(null)} className="lg:hidden p-1 rounded-lg text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
            {other.name.charAt(0)}{other.name.split(' ')[1]?.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{other.name}</p>
            <p className="text-[10px] text-muted-foreground">{other.institution} · {other.course}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selectedChat.messages.map(msg => {
            const isMe = msg.sender_id === currentUserId;
            return (
              <div key={msg.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[75%] px-4 py-2.5 rounded-2xl text-sm',
                  isMe
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                )}>
                  <p>{msg.content}</p>
                  <p className={cn('text-[10px] mt-1', isMe ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                    {formatTime(msg.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Escreva uma mensagem..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
              onKeyDown={e => e.key === 'Enter' && message.trim() && setMessage('')}
            />
            <button
              onClick={() => message.trim() && setMessage('')}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in -m-4 md:-m-6 lg:-m-8">
      <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] flex bg-card border border-border rounded-none lg:rounded-2xl overflow-hidden">
        {/* Sidebar - chat list */}
        <div className={cn(
          'w-full lg:w-80 border-r border-border flex-shrink-0',
          selectedChatId ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'
        )}>
          <div className="p-4 border-b border-border">
            <h1 className="text-lg font-bold text-foreground">Mensagens</h1>
          </div>
          <ChatList />
        </div>

        {/* Chat room */}
        <div className={cn(
          'flex-1',
          selectedChatId ? 'flex flex-col' : 'hidden lg:flex lg:items-center lg:justify-center'
        )}>
          {selectedChatId ? (
            <ChatRoom />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-primary" />
              </div>
              <p className="text-muted-foreground">Selecione uma conversa para começar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
