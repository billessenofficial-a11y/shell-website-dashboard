import { CheckCircle, Clock, XCircle, Play, Crown, Zap, Sparkles } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ready':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'generating':
    case 'queued':
      return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
    case 'error':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'ready':
      return 'Ready';
    case 'generating':
      return 'Generating...';
    case 'queued':
      return 'Queued';
    case 'error':
      return 'Error';
    default:
      return status;
  }
};

export const getPlanIcon = (planType: string) => {
  switch (planType) {
    case 'starter':
      return <Play className="w-4 h-4 text-green-500" />;
    case 'professional':
      return <Crown className="w-4 h-4 text-purple-500" />;
    case 'max':
      return <Zap className="w-4 h-4 text-orange-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-gray-500" />;
  }
};

export const getPlanColor = (planType: string) => {
  switch (planType) {
    case 'starter':
      return 'from-green-500 to-green-600';
    case 'professional':
      return 'from-purple-500 to-purple-600';
    case 'max':
      return 'from-orange-500 to-orange-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};