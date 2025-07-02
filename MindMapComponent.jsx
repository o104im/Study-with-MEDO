import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const MindMapComponent = ({ data }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // تحويل بيانات الخريطة الذهنية إلى تنسيق ReactFlow
  useEffect(() => {
    if (!data || !data.main_topic) return;

    const newNodes = [];
    const newEdges = [];
    
    // إضافة العقدة الرئيسية
    newNodes.push({
      id: 'main',
      data: { label: data.main_topic },
      position: { x: 0, y: 0 },
      style: {
        background: '#5D5FEF',
        color: 'white',
        border: '1px solid #5D5FEF',
        borderRadius: '8px',
        padding: '10px',
        width: 180,
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });

    // إضافة الفروع
    if (data.branches && data.branches.length > 0) {
      data.branches.forEach((branch, branchIndex) => {
        const branchId = `branch-${branchIndex}`;
        const branchX = Math.cos(((2 * Math.PI) / data.branches.length) * branchIndex) * 250;
        const branchY = Math.sin(((2 * Math.PI) / data.branches.length) * branchIndex) * 250;
        
        // إضافة عقدة الفرع
        newNodes.push({
          id: branchId,
          data: { label: branch.name },
          position: { x: branchX, y: branchY },
          style: {
            background: '#3E9BFF',
            color: 'white',
            border: '1px solid #3E9BFF',
            borderRadius: '8px',
            padding: '10px',
            width: 150,
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        });
        
        // إضافة حافة من العقدة الرئيسية إلى الفرع
        newEdges.push({
          id: `edge-main-${branchId}`,
          source: 'main',
          target: branchId,
          animated: false,
          style: { stroke: '#5D5FEF', strokeWidth: 2 },
        });
        
        // إضافة الأطفال (إن وجدت)
        if (branch.children && branch.children.length > 0) {
          branch.children.forEach((child, childIndex) => {
            const childId = `${branchId}-child-${childIndex}`;
            const angle = ((2 * Math.PI) / branch.children.length) * childIndex;
            const childX = branchX + Math.cos(angle) * 150;
            const childY = branchY + Math.sin(angle) * 150;
            
            // إضافة عقدة الطفل
            newNodes.push({
              id: childId,
              data: { label: child.name },
              position: { x: childX, y: childY },
              style: {
                background: '#FF7846',
                color: 'white',
                border: '1px solid #FF7846',
                borderRadius: '8px',
                padding: '10px',
                width: 130,
                fontSize: '12px',
                textAlign: 'center',
              },
            });
            
            // إضافة حافة من الفرع إلى الطفل
            newEdges.push({
              id: `edge-${branchId}-${childId}`,
              source: branchId,
              target: childId,
              animated: false,
              style: { stroke: '#3E9BFF', strokeWidth: 1.5 },
            });
          });
        }
      });
    }
    
    setNodes(newNodes);
    setEdges(newEdges);
  }, [data, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default MindMapComponent;

