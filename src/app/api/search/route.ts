import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/markdown'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  
  if (!query) {
    return NextResponse.json([])
  }
  
  try {
    const allPosts = getAllPosts()
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tag?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    
    return NextResponse.json(filtered)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}