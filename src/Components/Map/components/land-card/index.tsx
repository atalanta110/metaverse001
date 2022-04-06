import React from "react";
import { faCopy, faTimes } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import clsx from "clsx";
import SimpleBar from "simplebar-react";
import Carousel from "react-material-ui-carousel";

import { getLandPicture, getLandImage } from "../../api";
import { TextBox, Icon, Button } from "..";
import styles from "./styles.module.scss";

interface ILandCard {
  className?: string;
  name: string;
  location: string;
  galaxy: string;
  size: string;
  address: string;
  onClose: () => void;
  detail: string | null | undefined;
  image: string | undefined;
  picture: number;
  buy: boolean;
}

export function LandCard({
  className,
  name,
  location,
  galaxy,
  size,
  address,
  onClose,
  detail,
  image,
  picture,
  buy,
}: ILandCard) {
  return (
    <div
      className={clsx(
        `
          absolute top-4 left-4
          pt-4 pb-8 px-6
        `,
        styles.landBoxRoot,
        className
      )}
    >
      <div
        className={`
          flex justify-between items-center
          mb-5
        `}
      >
        <h6
          className={`
          font-bold text-xl leading-5
          text-white
        `}
        >
          {name}
        </h6>
        <span onClick={onClose}>
          <Icon
            className="cursor-pointer"
            icon={faTimes}
            color="white"
            fontSize="22px"
          />
        </span>
      </div>
      <div
        className={clsx(
          `
            mb-5
            `,
          styles.imgsBox
        )}
      >
        <Carousel
          className={styles.carouselRoot}
          autoPlay={false}
          navButtonsAlwaysVisible
        >
          {image && (
            <img
              className="img-scale-down"
              src={getLandImage(image)}
              alt="ariva-land-personal"
            />
          )}

          <img
            className="img-scale-down"
            src={getLandPicture(picture)}
            alt="ariva-land"
          />
        </Carousel>
      </div>

      <div
        className={`
          grid gap-4
        `}
      >
        {address && <TextBox title="Address" text={address} />}

        <TextBox
          title={galaxy}
          text={location}
          // icon={
          //   <Icon
          //     icon={faCopy}
          //     color="white"
          //     fontSize="17px"
          //     className="cursor-pointer"
          //     onClick={() => {
          //       navigator.clipboard.writeText(location);
          //     }}
          //   />
          // }
        />
        <TextBox title="Size" text={size} />
        {buy && (
          <TextBox
            title=""
            element={
              <Button
                className={clsx(
                  `
                      h-7 w-32  text-black
                      font-bold text-base leading-4
                    `,
                  styles.bidBtn
                )}
              >
                Buy Now
              </Button>
            }
            text={
              <SimpleBar
                style={{
                  maxHeight: 160,
                  width: "100%",
                  color: "white",
                  paddingRight: 13,
                }}
              >
                {detail ? parse(detail as string) : ""}
              </SimpleBar>
            }
          />
        )}
        <TextBox
          title=""
          text={
            <SimpleBar
              style={{
                maxHeight: 160,
                width: "100%",
                color: "white",
                paddingRight: 13,
              }}
            >
              {detail ? parse(detail as string) : ""}
            </SimpleBar>
          }
        />
      </div>
    </div>
  );
}
