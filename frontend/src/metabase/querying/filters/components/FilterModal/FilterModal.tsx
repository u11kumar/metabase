import { Flex, Modal } from "metabase/ui";
import type * as Lib from "metabase-lib";
import type Question from "metabase-lib/v1/Question";

import { useFilterModal } from "../../hooks/use-filter-modal";

import S from "./FilterModal.module.css";
import { FilterModalBody } from "./FilterModalBody";
import { FilterModalFooter } from "./FilterModalFooter";
import { FilterModalHeader } from "./FilterModalHeader";
import { getModalTitle, getModalWidth } from "./utils";

export interface FilterModalProps {
  question: Question;
  onSubmit: (newQuery: Lib.Query) => void;
  onClose: () => void;
}

export function FilterModal({ question, onSubmit, onClose }: FilterModalProps) {
  const {
    query,
    version,
    isChanged,
    groupItems,
    tab,
    setTab,
    canRemoveFilters,
    searchText,
    isSearching,
    visibleItems,
    handleInput,
    handleChange,
    handleReset,
    handleSubmit,
    handleSearch,
  } = useFilterModal(question, onSubmit);

  const onSubmitFilters = () => {
    handleSubmit();
    onClose();
  };

  return (
    <Modal.Root opened size={getModalWidth(groupItems)} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className={S.ModalHeader} p="lg">
          <Modal.Title>{getModalTitle(groupItems)}</Modal.Title>
          <Flex mx="md" justify="end" style={{ flex: 1 }}>
            <FilterModalHeader value={searchText} onChange={handleSearch} />
          </Flex>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={S.ModalBody} p={0}>
          <FilterModalBody
            groupItems={visibleItems}
            query={query}
            tab={tab}
            version={version}
            searching={isSearching}
            onChange={handleChange}
            onInput={handleInput}
            onTabChange={setTab}
          />
        </Modal.Body>
        <Flex
          className={S.ModalFooter}
          p="md"
          direction="row"
          justify="space-between"
        >
          <FilterModalFooter
            canRemoveFilters={canRemoveFilters}
            onClearFilters={handleReset}
            isChanged={isChanged}
            onApplyFilters={onSubmitFilters}
          />
        </Flex>
      </Modal.Content>
    </Modal.Root>
  );
}
