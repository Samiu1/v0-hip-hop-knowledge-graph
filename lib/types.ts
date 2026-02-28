export type NodeType = 'artist' | 'album' | 'era' | 'event' | 'movement' | 'region' | 'concept'

export type RelationshipType =
  | 'influenced'
  | 'collaborated'
  | 'sampled'
  | 'member_of'
  | 'pioneered'
  | 'rivals'
  | 'produced'
  | 'released_in'
  | 'originated_in'

export interface GraphNode {
  id: string
  name: string
  type: NodeType
  era: string | null
  year_start: number | null
  year_end: number | null
  region: string | null
  description: string | null
  influence_score: number
  metadata: Record<string, unknown>
  // runtime properties for force graph
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
}

export interface GraphEdge {
  id: number
  source_id: string
  target_id: string
  relationship: RelationshipType
  weight: number
  year: number | null
  // runtime: force-graph uses source/target as node refs or ids
  source: string | GraphNode
  target: string | GraphNode
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
  total_nodes: number
  total_edges: number
}

export interface Era {
  id: string
  name: string
  year_start: number
  year_end: number | null
  description: string | null
  color: string | null
  key_events: string[]
}

export interface AnalyticsSnapshot {
  id: number
  snapshot_at: string
  era: string | null
  top_nodes: Array<{ id: string; score: number }>
  genre_counts: Record<string, number>
  region_dist: Record<string, number>
  edge_density: number
  new_nodes: number
}

export interface CronLog {
  id: number
  job_name: string
  status: 'success' | 'error' | 'running'
  message: string | null
  ran_at: string
  duration_ms: number | null
}

export const ERA_COLORS: Record<string, string> = {
  era_roots:      '#6B4C2A',
  era_birth:      '#C94F1A',
  era_old_school: '#D4A017',
  era_golden:     '#2A7D4F',
  era_east_west:  '#1A4C8B',
  era_bling:      '#8B1A6B',
  era_internet:   '#1A7B8B',
  era_trap:       '#4A1A8B',
  era_modern:     '#8B4A1A',
}

export const NODE_COLORS: Record<NodeType, string> = {
  artist:   '#D4A017',
  album:    '#E05C2A',
  era:      '#2A7D4F',
  event:    '#1A7B8B',
  movement: '#8B1A6B',
  region:   '#1A4C8B',
  concept:  '#6B4C2A',
}

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  influenced:   'Influenced',
  collaborated: 'Collaborated',
  sampled:      'Sampled',
  member_of:    'Member of',
  pioneered:    'Pioneered',
  rivals:       'Rivals',
  produced:     'Produced',
  released_in:  'Released in',
  originated_in:'Originated in',
}
