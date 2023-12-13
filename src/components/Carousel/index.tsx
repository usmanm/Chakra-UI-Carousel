import { useMediaQuery, useTheme } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Item from "../Item";
import { Context, ContextType } from "../Provider";
import Slider from "../Slider";
import Track from "../Track";

export interface CarouselPropTypes {
  children: React.ReactNode[];
  gap: number;
}

export const Carousel: React.FC<CarouselPropTypes> = ({ children, gap }) => {
  const context = useContext(Context);

  const {
    setItemWidth,
    sliderWidth,
    setMultiplier,
    setConstraint,
    itemWidth,
    setPositions,
  } = context as ContextType;

  const { breakpoints } = useTheme();

  useEffect(() => {
    const newPositions = children?.map(
      (_, index) => -Math.abs((itemWidth + gap) * index)
    );

    setPositions(newPositions);
  }, [children, gap, itemWidth, setPositions]);

  const [isBetweenBaseAndMd] = useMediaQuery(
    `(min-width: ${breakpoints?.base}) and (max-width: ${breakpoints?.md})`
  );

  const [isBetweenMdAnd2Xl] = useMediaQuery(
    `(min-width: ${breakpoints?.md}) and (max-width: ${breakpoints?.["2xl"]})`
  );

  const [isGreaterThan2XL] = useMediaQuery(`(min-width: ${breakpoints?.["2xl"]})`);

  useEffect(() => {
    if (isBetweenBaseAndMd) {
      setItemWidth(sliderWidth - gap);
      setMultiplier(0.65);
      setConstraint(1);
    }
    if (isBetweenMdAnd2Xl) {
      setItemWidth(sliderWidth / 2 - gap);
      setMultiplier(0.5);
      setConstraint(2);
    }
    if (isGreaterThan2XL) {
      setItemWidth(sliderWidth / 3 - gap);
      setMultiplier(0.35);
      setConstraint(3);
    }
  }, [
    isBetweenBaseAndMd,
    isBetweenMdAndXl,
    isGreaterThanXL,
    sliderWidth,
    gap,
    setItemWidth,
    setMultiplier,
    setConstraint,
  ]);

  return (
    <Slider gap={gap}>
      <Track>
        {children.map((child, index) => (
          <Item gap={gap} key={index} index={index}>
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  );
};
