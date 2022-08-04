import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './styles.module.css';

const SCROLL_BOX_MIN_HEIGHT = 40;

const Card = ({ children, className, ...restProps }) => {
    const [hovering, setHovering] = useState(false);
    const [scrollBoxHeight, setScrollBoxHeight] = useState(
        SCROLL_BOX_MIN_HEIGHT
    );
    const [scrollBoxTop, setScrollBoxTop] = useState(0);

    const handleMouseOver = useCallback(() => {
        !hovering && setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering && setHovering(false);
    }, [hovering]);

    const handleScroll = useCallback(() => {
        if (!scrollHostRef) {
            return;
        }
        const scrollHostElement = scrollHostRef.current;
        const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

        let newTop =
            (parseInt(scrollTop, 10) / parseInt(scrollHeight, 10)) *
            offsetHeight;
        // console.log(
        //     newTop,
        //     scrollBoxHeight,
        //     scrollTop,
        //     scrollHeight,
        //     offsetHeight
        // );

        console.log(offsetHeight - scrollBoxHeight);
        // newTop = newTop + parseInt(scrollTop, 10);
        newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
        setScrollBoxTop(newTop);
    }, []);

    const scrollHostRef = useRef();

    useEffect(() => {
        const scrollHostElement = scrollHostRef.current;
        const { clientHeight, scrollHeight } = scrollHostElement;
        const scrollBoxPercentage = clientHeight / scrollHeight;
        const scrollbarHeight = Math.max(
            scrollBoxPercentage * clientHeight,
            SCROLL_BOX_MIN_HEIGHT
        );
        setScrollBoxHeight(scrollbarHeight);
        scrollHostElement.addEventListener('scroll', handleScroll, true);
        return function cleanup() {
            scrollHostElement.removeEventListener('scroll', handleScroll, true);
        };
    }, []);

    return (
        <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={styles.cover}
        >
            <div
                ref={scrollHostRef}
                className={`scrollhost ${className}`}
                {...restProps}
            >
                {children}
            </div>
            <div
                className={styles.scrollBar}
                style={{ opacity: hovering ? 1 : 0 }}
            >
                <div
                    className={'scroll-thumb'}
                    style={{ height: scrollBoxHeight, top: scrollBoxTop }}
                />
            </div>
        </div>
    );
};

export default Card;
