"use client";

import {
  MotionChain,
  MotionContainer,
  MotionImage,
  MotionText,
  type AnimationController,
  type MotionElementType,
  type MotionImageProps,
} from "motion-provider";
import { createElement, Fragment, useState, type ReactNode } from "react";
import {
  animationFor,
  chainChild,
  imageStyle,
  isElement,
  nodeProps,
  staggerFor,
  VOID_TAGS,
} from "../lib/motion";
import type {
  Assignments,
  Layer,
  Markup,
  MarkupNode,
} from "../types/playground";

type Props = {
  markup: Markup;
  assignments: Assignments;
  active: ReadonlySet<string>;
  selected?: string;
  controller: AnimationController;
  passive: AnimationController;
  onError: (message: string) => void;
};

function PreviewImage(props: MotionImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <MotionImage
      {...props}
      onLoad={() => setFailed(false)}
      onError={() => setFailed(true)}
      fallback={
        <div className="mp-image-fallback" role="status">
          {failed ? "Image unavailable" : "Loading image…"}
        </div>
      }
    />
  );
}

export function MotionTree({
  markup,
  assignments,
  active,
  selected,
  controller,
  passive,
  onError,
}: Props) {
  const layers = new Map(
    markup.layers.map((layer): [string, Layer] => [layer.id, layer]),
  );
  const onMotionError = (error: Error) => onError(error.message);

  function render(node: MarkupNode): ReactNode {
    if (!isElement(node)) return node;
    const { id, tag } = node;
    const props = nodeProps(node);
    const marker = {
      "data-mp-layer": id,
      "data-mp-selected": id === selected ? "" : undefined,
    };
    const children = VOID_TAGS.has(tag) ? undefined : node.children.map(render);
    const layer = layers.get(id);
    const settings = assignments[id];
    if (!layer || !settings)
      return createElement(tag, { ...props, ...marker, key: id }, children);

    const animation = animationFor(settings);
    const timing = staggerFor(settings);
    const playback = active.has(id) ? controller : passive;
    const elementType = tag as MotionElementType;
    const common = { animation, controller: playback, onMotionError };
    if (layer.kind === "MotionText") {
      const { className, ...rest } = props;
      return (
        <MotionText
          key={id}
          {...rest}
          {...marker}
          {...common}
          elementType={elementType}
          wrapperClassName={
            typeof className === "string" ? className : undefined
          }
          config={{ ...timing, mode: settings.split }}
        >
          {node.children.join("")}
        </MotionText>
      );
    }
    if (layer.kind === "MotionImage" && typeof props.src === "string") {
      const {
        src,
        className,
        width: _width,
        height: _height,
        alt,
        srcSet,
        ...rest
      } = props;
      const interact =
        settings.interaction !== "auto" ? settings.interaction : undefined;
      // Images with an interaction have their own driver when selected or in batch mode.
      const imageController = interact && active.has(id) ? undefined : playback;
      return (
        <PreviewImage
          key={`${id}:${src}:${String(srcSet)}`}
          {...rest}
          {...marker}
          {...common}
          controller={imageController}
          alt={typeof alt === "string" ? alt : ""}
          srcSet={typeof srcSet === "string" ? srcSet : undefined}
          wrapperClassName={
            typeof className === "string" ? className : undefined
          }
          style={imageStyle(node)}
          config={{
            ...timing,
            img: src,
            pieces: settings.pieces,
            fn: interact,
          }}
        />
      );
    }
    if (layer.kind === "MotionChain") {
      const items = node.children.filter(isElement);
      const layout = chainChild(
        node,
        items.some((child) => !!assignments[child.id]),
        items,
      );
      const chain = (
        <MotionChain
          {...layout.props}
          {...common}
          config={timing}
          elementType={layout.tag as MotionElementType}
        >
          {items.map((child) =>
            layout.shared ? (
              <Fragment key={child.id}>{child.children.map(render)}</Fragment>
            ) : (
              render(layout.list ? { ...child, tag: "div" } : child)
            ),
          )}
        </MotionChain>
      );
      const markChildren = layout.shared
        ? (root: Element | null) => {
            if (!root) return;
            for (const [index, item] of items.entries()) {
              const child = root.children.item(index);
              child?.setAttribute("data-mp-layer", item.id);
              child?.toggleAttribute("data-mp-selected", selected === item.id);
            }
          }
        : undefined;
      return createElement(
        tag,
        { ...props, ...marker, key: id, ref: markChildren },
        chain,
      );
    }
    return (
      <MotionContainer
        key={id}
        {...props}
        {...marker}
        {...common}
        elementType={elementType}
      >
        {children}
      </MotionContainer>
    );
  }

  return <>{markup.nodes.map(render)}</>;
}
