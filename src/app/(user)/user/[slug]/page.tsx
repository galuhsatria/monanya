import React from 'react';

interface UserProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: UserProps) {
  const { slug } = params;
  return <div>Page</div>;
}
