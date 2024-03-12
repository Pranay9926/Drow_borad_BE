// DrawingCanvas.tsx
import React, { useRef, useState, useEffect } from 'react';

interface DrawingCanvasProps {
    drawing: Array<Array<{ x: number; y: number; color: string; width: number }>>;
    onDrawingChange: (drawing: Array<Array<{ x: number; y: number; color: string; width: number }>>) => void;
    strokeColor: string;
    strokeWidth: number;
    // cursorStyle: any;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
    drawing,
    onDrawingChange,
    strokeColor,
    strokeWidth,
    // cursorStyle
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<Array<{ x: number; y: number; color: string; width: number }>>([]);

    const scaleCoordinates = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const devicePixelRatio = window.devicePixelRatio || 1;

        if (!rect || !canvasRef.current) {
            return { x: 0, y: 0 };
        }

        const scaleX = (canvasRef.current.width * devicePixelRatio) / rect.width;
        const scaleY = (canvasRef.current.height * devicePixelRatio) / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        return { x, y };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;

        if (context && canvas) {
            canvas.width = canvas.clientWidth * devicePixelRatio;
            canvas.height = canvas.clientHeight * devicePixelRatio;

            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            drawing.forEach((path) => drawPath(context, path, devicePixelRatio));
            drawPath(context, currentPath, devicePixelRatio);
        }
    }, [drawing, currentPath, strokeWidth]);

    const drawPath = (context: CanvasRenderingContext2D, path: Array<{ x: number; y: number; color: string; width: number }>, devicePixelRatio: number) => {
        if (path.length > 0) {
            context.beginPath();
            context.moveTo(path[0].x * devicePixelRatio, path[0].y * devicePixelRatio);

            for (let i = 1; i < path.length; i++) {
                context.lineTo(path[i].x * devicePixelRatio, path[i].y * devicePixelRatio);
            }

            context.strokeStyle = path[0].color;
            context.lineWidth = path[0].width;
            context.lineJoin = 'round';
            context.lineCap = 'round';

            context.stroke();
        }
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const scaledCoordinates = scaleCoordinates(e);
        setIsDrawing(true);
        setCurrentPath([{ x: scaledCoordinates.x, y: scaledCoordinates.y, color: strokeColor, width: strokeWidth }]);
    };

    const continueDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing) return;

        const scaledCoordinates = scaleCoordinates(e);
        setCurrentPath((prevPath) => [...prevPath, { x: scaledCoordinates.x, y: scaledCoordinates.y, color: strokeColor, width: strokeWidth }]);
    };

    const endDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            onDrawingChange([...drawing, currentPath]);
            setCurrentPath([]);
        }
    };

    return (
        <div className='h-full'>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={continueDrawing}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
            // style={{ cursor: cursorStyle }}
            />
        </div>
    );
};

export default DrawingCanvas;
