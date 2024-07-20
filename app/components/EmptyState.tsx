'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import Button from './Button';
import Header from './listings/Header';

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Nenhum Serviço encontrado.",
    subtitle = "Tente alterar os filtros",
    showReset
}) => {
    const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center min-h-screen'>
      <Header
      title={title}
      subtitle={subtitle}
      center
      />
      <div className="w-48 mt-4">
        {showReset && (
            <Button 
            red
            label='Remove all filters'
            onClick={() => router.push('/')}
            />
        )}
      </div>
    </div>
  )
}

export default EmptyState
