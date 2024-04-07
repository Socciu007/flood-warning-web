import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Divider, Form, Input, Select, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import TextArea from "antd/es/input/TextArea";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import * as message from "../../components/Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const user = useSelector((state) => state?.user);
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    newType: "",
    discount: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [typeSelect, setTypeSelect] = useState("");
  const [stateProduct, setStateProduct] = useState(inittial());
  const [stateProductDetail, setStateProductDetail] = useState(inittial());
  const searchInput = useRef(null);

  const [form] = Form.useForm();

  //create
  const mutation = useMutationHooks((data) => {
    const { name, type, image, description, price, rating, countInStock } =
      data;
    const res = ProductService.createProduct({
      name,
      type,
      image,
      description,
      price,
      rating,
      countInStock,
    });
    return res;
  });
  //update
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });
  //delete
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });
  //delete many
  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });
  //get all
  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  //get details
  const fetchGetDetailProduct = async (rowSelected) => {
    const res = await ProductService.getDetailProduct(rowSelected);
    if (res?.data) {
      setStateProductDetail({
        name: res?.data?.name,
        type: res?.data?.type,
        image: res?.data?.image,
        description: res?.data?.description,
        price: res?.data?.price,
        rating: res?.data?.rating,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
      });
    }
    setIsLoadingUpdate(false);
  };
  //get all type
  const fetchGetAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetail);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetail, isModalOpen]);
  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const { data, isPending, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isPending: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;
  const {
    data: dataDeleteMany,
    isSuccess: isSuccessDeleteMany,
    isError: isErrorDeleteMany,
  } = mutationDeleteMany;
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });
  const typeProduct = useQuery({
    queryKey: ["type-products"],
    queryFn: fetchGetAllTypeProduct,
  });

  const { isLoading: isLoadingProducts, data: products } = queryProduct;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  const renderAction = () => {
    return (
      <div style={{ display: "flex", gap: "7px" }}>
        <EditOutlined
          onClick={handleDetailProduct}
          style={{
            color: "#256aa5e8",
            fontSize: "16px",
            cursor: "pointer",
          }}
        />
        <DeleteOutlined
          onClick={() => setIsModalOpenDelete(true)}
          style={{ color: "#bd3d3dd4", fontSize: "16px", cursor: "pointer" }}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 360,
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "type",
      width: 150,
      sorter: (a, b) => a.type.length - b.type.length,
      filters: [
        {
          text: "Smart Phone",
          value: "1",
        },
        {
          text: "Laptop",
          value: "2",
        },
        {
          text: "Tablet",
          value: "3",
        },
        {
          text: "Accessories",
          value: "4",
        },
        {
          text: "Watch",
          value: "5",
        },
        {
          text: "Smart Watch",
          value: "6",
        },
        {
          text: "Utility Services",
          value: "7",
        },
      ],
      onFilter: (value, record) => {
        switch (value) {
          case "1":
            return record.type === "Smart Phone";
          case "2":
            return record.type === "Laptop";
          case "3":
            return record.type === "Tablet";
          case "4":
            return record.type === "Accessories";
          case "5":
            return record.type === "Watch";
          case "6":
            return record.type === "Smart Watch";
          case "7":
            return record.type === "Utility Services";
          default:
            break;
        }
      },
    },
    {
      title: "Count in Stock",
      dataIndex: "countInStock",
      width: 180,
      sorter: (a, b) => a.countInStock - b.countInStock,
      filters: [
        {
          text: "<= 5",
          value: "<=",
        },
        {
          text: "> 5",
          value: ">",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<=") {
          return record.countInStock <= 5;
        } else if (value === ">") {
          return record.countInStock > 5;
        }
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 150,
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: "<= 100",
          value: "<=",
        },
        {
          text: "> 100",
          value: ">",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<=") {
          return record.price <= 100;
        } else if (value === ">") {
          return record.price > 100;
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: "<= 3",
          value: "<=",
        },
        {
          text: "> 3",
          value: ">",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<=") {
          return record.rating <= 3;
        } else if (value === ">") {
          return record.rating > 3;
        }
      },
    },
    {
      title: "Action",
      width: 90,
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable = products?.data?.map((product) => {
    return { ...product, key: product._id };
  });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      handleCancel();
      message.success();
    } else if (isError || data?.status === "ERR") {
      message.error();
    }
  }, [isSuccess, data, isError]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleClose();
    } else if (isErrorUpdated || dataUpdated?.status === "ERR") {
      message.error();
    }
  }, [isSuccessUpdated, dataUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted || dataDeleted?.status === "ERR") {
      message.error();
    }
  }, [isSuccessDeleted, dataDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeleteMany && dataDeleteMany?.status === "OK") {
      message.success();
    } else if (isErrorDeleteMany || dataDeleteMany?.status === "ERR") {
      message.error();
    }
  }, [isSuccessDeleteMany, dataDeleteMany, isErrorDeleteMany]);
  // handle create
  const handleOk = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  //handle close create
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  //handle open update
  const handleDetailProduct = () => {
    setIsOpenDrawer(true);
  };
  //handle update
  const handleUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateProductDetail,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  //handle close update
  const handleClose = () => {
    setIsOpenDrawer(false);
    // setStateProductDetail({
    //   name: "",
    //   type: "",
    //   image: "",
    //   description: "",
    //   price: "",
    //   rating: "",
    //   countInStock: "",
    // });
    // form.resetFields();
  };
  //handle delete
  const handleOkDelete = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  //handle close delete
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  // handle delete many
  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  //save data create
  const handleOnChange = (e) => {
    setStateProduct({ ...stateProduct, [e.target.name]: e.target.value });
  };
  const handleOnchangeSelected = (value) => {
    setTypeSelect(value);
    setStateProduct({ ...stateProduct, type: value });
  };
  //save data update
  const handleOnChangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
  };
  //save data image create
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  //save data image update
  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => setIsModalOpen(true)}
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteManyProduct={handleDeleteManyProduct}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingProducts}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            onFinish={handleOk}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: "Please input your name product!" },
              ]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[
                { required: true, message: "Please input your category!" },
              ]}
            >
              <Select
                name="type"
                value={stateProduct.type}
                onChange={handleOnchangeSelected}
                options={renderOptions(typeProduct?.data?.data)}
              />
            </Form.Item>
            {typeSelect === "add_type" && (
              <Form.Item
                label="Tên loại khác"
                name="newType"
                rules={[
                  { required: true, message: "Please input your category!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.newType}
                  onChange={handleOnChange}
                  name="newType"
                />
              </Form.Item>
            )}
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatar}
                listType="picture-card"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count in stock!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnChange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnChange}
                name="price"
              />
            </Form.Item>
            <Form.Item label="Khuyến mãi" name="discount">
              <InputComponent
                value={stateProduct.discount}
                onChange={handleOnChange}
                name="discount"
              />
            </Form.Item>
            <Form.Item label="Đánh giá" name="rating">
              <InputComponent
                value={stateProduct.rating}
                onChange={handleOnChange}
                name="rating"
              />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <TextArea
                rows={4}
                value={stateProduct.description}
                onChange={handleOnChange}
                name="description"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <ModalComponent
        forceRender
        title="Xoá sản phẩm"
        centered
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc chắn muốn xoá sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: "90%" }}
            onFinish={handleUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: "Please input your name product!" },
              ]}
            >
              <InputComponent
                value={stateProductDetail.name}
                onChange={handleOnChangeDetail}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[
                { required: true, message: "Please input your category!" },
              ]}
            >
              <InputComponent
                value={stateProductDetail.type}
                onChange={handleOnChangeDetail}
                name="type"
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatarDetail}
                listType="picture-card"
                maxCount={3}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count in stock!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetail.countInStock}
                onChange={handleOnChangeDetail}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputComponent
                value={stateProductDetail.price}
                onChange={handleOnChangeDetail}
                name="price"
              />
            </Form.Item>
            <Form.Item label="Khuyến mãi" name="discount">
              <InputComponent
                value={stateProductDetail.discount}
                onChange={handleOnChangeDetail}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Đánh giá"
              name="rating"
              rules={[
                { required: false, message: "Please input your rating!" },
              ]}
            >
              <InputComponent
                value={stateProductDetail.rating}
                onChange={handleOnChangeDetail}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <TextArea
                rows={4}
                value={stateProductDetail.description}
                onChange={handleOnChangeDetail}
                name="description"
              />
            </Form.Item>
            <Button type="primary" onClick={handleUpdateProduct}>
              Cập nhật
            </Button>
          </Form>
        </Loading>
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;
