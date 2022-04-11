import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModalMeta from "components/Collection/ModalMeta";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import { useWeb3TransactionPresenter } from "components/ui/TransactionPresenter";
import { Contract } from "lib/contracts";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const FullImage = styled.img`
  width: 100%;
  height: 100%;
  // max-width: 50%;
  border-radius: 6px;
  object-fit: cover;
  background-size: cover;

  ${(props) => props.theme.breakpoints.down("sm")} {
    max-height: 600px;
  }
`;

const PriceWrapper = styled.div`
  background: #5a5a5a;
  height: 50px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
`;

const stylesCard = (theme: any) => ({
  display: "flex",
  boxShadow: "0",
  flexDirection: "row",
  maxWidth: "1000px",

  [theme.breakpoints.between("xs", "sm")]: {
    flexDirection: "column",
  },
});

const stylesContent = (theme: any) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  flex: "1",
  justifyContent: "space-between",
  [theme.breakpoints.between("xs", "sm")]: {
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
});

interface Item {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function CollectionsIndex() {
  const { makeTransaction } = useWeb3TransactionPresenter();
  const [modal, setModalOpen] = useState<Item>();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <div style={{ padding: "2rem" }}>
          <h1>Characters</h1>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "40px" }}>
            {items.map((item) => (
              <Card key={item.id} sx={stylesCard}>
                <span style={{ width: "100%", height: "100%", position: "relative" }}>
                  <FullImage src={item.image} />
                  <Link href={"/collections/" + item.id} passHref>
                    <Button
                      text="View in 3D"
                      style={{
                        position: "absolute",
                        width: "200px",
                        bottom: "25px",
                        left: "0",
                        right: "0",
                        margin: "0 auto",
                      }}
                    />
                  </Link>
                </span>
                <Box sx={{ minWidth: "50%" }}>
                  <CardContent sx={stylesContent}>
                    <Typography component="div" variant="h3">
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" component="div">
                      {item.description}
                    </Typography>
                    <div>
                      <PriceWrapper>
                        <span
                          style={{
                            fontSize: "1.2rem",
                            padding: "0 12px",
                            height: "49px",
                            lineHeight: "45px",
                            fontFamily: "monospace",
                          }}
                        >
                          {item.price} ETH
                        </span>
                        <Button
                          small
                          style={{ height: "50px", width: "115px", borderRadius: "4px" }}
                          text="Mint"
                          onClick={() => {
                            const price = parseUnits(item.price.toString(), "ether");
                            makeTransaction<Contract.Playables, "mint">({
                              description: {
                                action: "Mint",
                                description: "Mint " + item.name,
                                value: price,
                              },
                              fn: "mint",
                              args: [
                                {
                                  tokenId: BigNumber.from(item.id),
                                  amount: BigNumber.from("1"),
                                  promoCode: "",
                                },
                                {
                                  value: price,
                                },
                              ],
                              contract: Contract.Playables,
                            });
                          }}
                        />
                      </PriceWrapper>
                    </div>

                    <ModalMeta item={item}></ModalMeta>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
