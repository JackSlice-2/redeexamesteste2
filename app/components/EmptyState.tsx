'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Nenhum Serviço Encontrado.",
    subtitle = "Tente alterar os filtros",
    showReset
}) => {
    const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center min-h-screen'>
      <Heading
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
