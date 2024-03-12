// showCanvas.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPalette } from '@fortawesome/free-solid-svg-icons';
import { SketchPicker } from 'react-color';
import DrawingCanvas from './draw-canvas';
import { socket } from '../../servics';

const ShowCanvas = () => {
    const [drawing, setDrawing] = useState<Array<Array<{ x: number; y: number; color: string; width: number }>>>([]);
    const [strokeColor, setStrokeColor] = useState("black");
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [eraserMode, setEraserMode] = useState(false);

    useEffect(() => {
        socket.on("canvasDataResponse", (data) => {
            setDrawing(data.canvasData);
        });
    }, []);

    const handleDrawingChange = (newDrawing: Array<Array<{ x: number; y: number; color: string; width: number }>>) => {
        setDrawing(newDrawing);
        let id = localStorage.getItem("roomID");
        socket.emit("canvasData", { canvasData: newDrawing, roomId: id });
    };

    const handleStrokeColorChange = (e: any) => {
        setStrokeColor(e);
        setEraserMode(false); // Switch back to drawing mode when changing color
    };

    const handleStrokeWidthChange = (width: number) => {
        setStrokeWidth(width);
    };

    const handlePaletteClick = () => {
        setShowColorPicker(!showColorPicker);
        setEraserMode(false); // Switch back to drawing mode when opening color picker
    };

    const handleEraserClick = () => {
        setEraserMode(!eraserMode);
        setShowColorPicker(false); // Close color picker when switching to eraser mode
    };

    const handleColorChange = (hex: any) => setStrokeColor(hex.hex);

    return (
        <section className="flex w-full">
            <div className="h-full w-[60px] bg-orange-200">
                <div className='flex flex-col h-32 relative'>
                    <FontAwesomeIcon
                        className="h-6 p-4"
                        color={strokeColor}
                        onClick={handlePaletteClick}
                        icon={faPalette}

                    />
                    {showColorPicker ? <div className='absolute right-[-220px] top-[50px]'>
                        <SketchPicker
                            color={strokeColor}
                            onChangeComplete={handleColorChange}
                        />
                    </div> : ""}
                    <FontAwesomeIcon
                        className="h-6 p-2"
                        color='black'
                        onClick={handleEraserClick}
                        icon={faEraser}

                    />
                </div>
            </div>
            <div className='w-full'>
                <DrawingCanvas
                    drawing={drawing}
                    onDrawingChange={handleDrawingChange}
                    strokeColor={eraserMode ? "#f8fafc" : strokeColor}
                    strokeWidth={strokeWidth}

                />
            </div>
        </section>
    );
};

export default ShowCanvas;
