/**
 * @todo
 * - Add form
 * - try local data
 * - refactor
 */

//  example data
// {
//   "budgetItem":"Internet Indihome",
//   "budgetAmount":315000,
//   "type":"outcome",
//   "status":"payed",
//   "category":"Layanan Berlangganan",
//   "budget":"Juni 2021",
//   ?"receiptUrl":"http://image.com",
//   "notes":""
// }

import React, { useEffect, useState } from "react";
import { Card, StyledBody } from "baseui/card";
import { Button, KIND, SHAPE } from "baseui/button";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { StatefulTooltip } from "baseui/tooltip";
import { Label2, Label3, Label4, H3, H5 } from "baseui/typography";
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import {
  ChevronDown,
  Delete,
  Overflow,
  Upload,
  Plus,
  CheckIndeterminate
} from "baseui/icon";

import ModalForm from "./Components/ModalForm";

var formatterCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR"

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ITEMS_IN = Array.from({ length: 5 }, () => ({
  budgetItem: "Monthly Payroll",
  budgetAmount: 100000,
  createdAt: new Date(),
  type: "income"
}));

const ITEMS_OUT = Array.from({ length: 5 }, () => ({
  budgetItem: "Food and beverage",
  budgetAmount: 78000,
  createdAt: new Date(),
  type: "outcome"
}));

const App = () => {
  const [openModalState, setOpenModalState] = useState(true);
  const [formType, setFormType] = useState();
  const [amount, setAmount] = useState(0);
  const [useCss, theme] = useStyletron();

  const handleAddNewTransaction = (type) => {
    if (amount > 0) {
      setFormType(type);
    }
  };

  useEffect(() => {
    if (formType) setOpenModalState(true);
  }, [formType]);

  return (
    <Card
      overrides={{
        Root: {
          style: {
            left: "50%",
            maxWidth: "420px",
            position: "absolute",
            top: "20px",
            transform: "translate(-50%, 0)",
            width: "95vw",
            border: "none"
          }
        }
      }}
    >
      <H5>Cashlify.</H5>
      <StyledBody>
        <Input
          type="number"
          placeholder="0"
          onChange={(event) => setAmount(Number(event.target.value))}
          overrides={{
            Input: {
              style: () => ({
                fontSize: "20px"
              })
            },
            InputContainer: {
              style: ({ $theme }) => ({
                background: $theme.colors.white
              })
            },
            After: () => (
              <>
                <StatefulTooltip
                  accessibilityType={"tooltip"}
                  content="Tambah Pengeluaran"
                >
                  <Button
                    onClick={() => handleAddNewTransaction("outcome")}
                    kind={KIND.minimal}
                    disabled={!amount}
                    shape={SHAPE.square}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className={useCss({
                        height: theme.sizing.scale600,
                        width: theme.sizing.scale600
                      })}
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
                    </svg>
                  </Button>
                </StatefulTooltip>
                <StatefulTooltip
                  accessibilityType={"tooltip"}
                  content="Tambah Pemasukan"
                >
                  <Button
                    kind={KIND.minimal}
                    shape={SHAPE.square}
                    disabled={!amount}
                    onClick={() => handleAddNewTransaction("income")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className={useCss({
                        height: theme.sizing.scale600,
                        width: theme.sizing.scale600
                      })}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                    </svg>
                  </Button>
                </StatefulTooltip>
              </>
            )
          }}
        />
        <div
          style={{
            aspectRatio: "8/5",
            padding: "5%",
            minWidth: "320px",
            maxWidth: "420px",
            borderRadius: "18px",
            border: "none",
            margin: "20px 0",
            position: "relative",
            backgroundColor: "#fbb034",
            backgroundImage: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%"
            }}
          >
            <div style={{ flex: 2 }}>
              <FlexGrid
                flexGridColumnCount={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <FlexGridItem>
                  <Label4 color="#fafafa">Saldo</Label4>
                  <H3
                    style={{ margin: 0, position: "relative", top: -5 }}
                    color="#fff"
                  >
                    25.000.000
                  </H3>
                </FlexGridItem>
                <FlexGridItem style={{ textAlign: "right" }}>
                  <div
                    style={{
                      borderRadius: "50%",
                      width: 34,
                      height: 34,
                      background: "#fff",
                      display: "inline-block"
                    }}
                  ></div>
                  <div
                    style={{
                      borderRadius: "50%",
                      width: 34,
                      height: 34,
                      background: "rgba(255,255,255,0.8)",
                      display: "inline-block",
                      position: "relative",
                      left: -8
                    }}
                  ></div>
                </FlexGridItem>
              </FlexGrid>
            </div>
            <div style={{ flex: 1 }}>
              <FlexGrid
                flexGridColumnCount={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <FlexGridItem>
                  <Label3 color="#fff">**** **** **** ****</Label3>
                  <Label3 color="#fff">14/09/2021</Label3>
                </FlexGridItem>
                <FlexGridItem style={{ textAlign: "right" }}>
                  <Label2 color="#fff" style={{ fontWeight: 400 }}>
                    Cashlify
                  </Label2>
                </FlexGridItem>
              </FlexGrid>
            </div>
            <div style={{ flex: 1 }}>
              <FlexGrid
                flexGridColumnCount={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <FlexGridItem>
                  <Label4 color="#fafafa">In</Label4>
                  <Label2 color="#fff">30.000</Label2>
                </FlexGridItem>
                <FlexGridItem>
                  <Label4 color="#fafafa">Out</Label4>
                  <Label2 color="#fff">450.000</Label2>
                </FlexGridItem>
              </FlexGrid>
            </div>
          </div>
        </div>

        <Label2 style={{ marginBottom: theme.sizing.scale600 }}>
          Last Transaction
        </Label2>
        <ul
          className={useCss({
            paddingLeft: 0,
            paddingRight: 0
          })}
        >
          {[...ITEMS_IN, ...ITEMS_OUT].map((item) => (
            <ListItem
              artwork={item.type === "income" ? Plus : CheckIndeterminate}
              artworkSize={ARTWORK_SIZES.MEDIUM}
              endEnhancer={() => (
                <Button size="compact" kind="secondary" shape="pill">
                  <Label4
                    color={
                      item.type === "income"
                        ? theme.colors.positive200
                        : theme.colors.negative200
                    }
                  >
                    {formatterCurrency.format(item.budgetAmount)}
                  </Label4>
                </Button>
              )}
            >
              <ListItemLabel description={item.createdAt.toLocaleString()}>
                {item.budgetItem}
              </ListItemLabel>
            </ListItem>
          ))}
        </ul>
      </StyledBody>
      <ModalForm
        amount={amount}
        type={formType}
        open={[openModalState, setOpenModalState]}
      />
    </Card>
  );
};

export default App;
