import * as React from "react";
import { KIND as ButtonKind } from "baseui/button";
import { Input, SIZE } from "baseui/input";
import { Textarea } from "baseui/textarea";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE
} from "baseui/modal";
import { Label3 } from "baseui/typography";
import { useStyletron } from "baseui";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Select } from "baseui/select";
const InputSpace = (props) => {
  const [css, theme] = useStyletron();
  return (
    <div className={css({ padding: `0${theme.sizing.scale300}` })}>
      {props.children}
    </div>
  );
};

export default function ModalForm(props) {
  const [isOpen, setIsOpen] = props.open || [false, () => {}];
  const [itemName, setItemName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [budget, setBudget] = React.useState("092021");
  const [statuses, setStatuses] = React.useState("payed");
  const [currency, setCurrency] = React.useState("idr");
  const [notes, setNotes] = React.useState("");
  const AMOUNT_ITEM = `${currency.toUpperCase()}. ${props.amount}`;
  const TITLE =
    props.type === "incoming"
      ? `Tambahkan Pemasukan ${AMOUNT_ITEM}`
      : `Tambahkan Pengeluaran ${AMOUNT_ITEM}`;
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>{props.title || TITLE}</ModalHeader>
      <ModalBody>
        <InputSpace>
          <Label3 marginBottom="12px">Nama Item</Label3>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Contoh: Makan Siang"
          />
        </InputSpace>
        <InputSpace>
          <Label3 marginBottom="12px">Kategori</Label3>
          <Select
            escapeClearsValue={false}
            options={[
              { label: "Makan & Minum", id: "#F0F8FF" },
              { label: "Transportasi", id: "#FAEBD7" },
              { label: "Cicilan", id: "#00FFFF" },
              { label: "Sewa Tempat Tinggal", id: "#7FFFD4" },
              { label: "Pulsa", id: "#F0FFFF" },
              { label: "Nafkah", id: "#F5F5DC" }
            ]}
            placeholder="Pilih kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </InputSpace>
        <InputSpace>
          <Label3 marginBottom="12px">Budget</Label3>
          <Select
            escapeClearsValue={false}
            options={[
              { label: "Agustus 2021", id: "082021" },
              { label: "September 2021", id: "092021" }
            ]}
            placeholder="Pilih budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </InputSpace>
        <InputSpace>
          <Label3 marginBottom="12px">Status</Label3>
          <RadioGroup value={statuses} name="number" align={ALIGN.horizontal}>
            <Radio value="payed">Telah Dibayar</Radio>
            <Radio value="scheduled">Dijadwalkan</Radio>
          </RadioGroup>
        </InputSpace>
        <InputSpace>
          <Label3 marginBottom="12px">Mata Uang</Label3>
          <RadioGroup value={currency} name="number" align={ALIGN.horizontal}>
            <Radio value="idr">Rupiah (IDR)</Radio>
            <Radio value="usd">US Dollar (USD)</Radio>
          </RadioGroup>
        </InputSpace>
        <InputSpace>
          <Label3 marginBottom="12px">Catatan Tambahan</Label3>
          <Textarea
            size={SIZE.compact}
            placeholder="Contoh: Menunggu dari client.."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </InputSpace>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={() => setIsOpen(false)}
          kind={ButtonKind.tertiary}
        >
          Cancel
        </ModalButton>
        <ModalButton>{props.confirmTitle || "Simpan"}</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
