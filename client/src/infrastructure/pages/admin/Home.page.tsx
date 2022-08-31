import {
  Card,
  Checkbox,
  Image,
  message,
  Slider,
  Space,
  Spin,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { ColumnType } from "antd/lib/table";
import { AxiosError } from "axios";
import { getAwardApi } from "infrastructure/common/api";
import { toDisplay } from "infrastructure/common/helper";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { TGetAwardApiResponse } from "types/api/award.d";
import { AwardType, TAward, TAwardPageState } from "types/page/award.page.d";

const awardTypes = Object.values(AwardType);

const sliderMarks = {
  2_500_000: `IDR. ${toDisplay(2_500_000)}`,
};

const HomePage = () => {
  const [state, setState] = useState<TAwardPageState>({
    filter: {
      current: 1,
      pageSize: 10,
      skip: 0,
      types: [],
      pointStart: 100_000,
      pointEnd: 5_000_000,
    },
  });

  const queryClient = useQueryClient();

  const {
    data,
    isFetching,
    isLoading,
    isPreviousData,
    isError,
    error,
    refetch,
  } = useQuery<TGetAwardApiResponse, AxiosError>({
    queryKey: ["awards", state.filter],
    queryFn: () => getAwardApi(state.filter),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 5000,
    onSuccess: (response) =>
      setState((prevState) => ({ ...prevState, skip: response?.data.skip })),
  });

  const onFilterChange = (pagination: TablePaginationConfig) => {
    setState((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        current: pagination.current!,
        pageSize: pagination.pageSize!,
      },
    }));
  };

  const onTypeChange = (awardTypes: CheckboxValueType[]) => {
    setState((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        types: awardTypes as AwardType[],
      },
    }));
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        types: e.target.checked ? awardTypes : [],
      },
    }));
  };

  const onPointRangeChange = (values: [number, number]) => {
    setState((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        pointStart: values[0],
        pointEnd: values[1],
      },
    }));
  };

  const columns: ColumnType<TAward>[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Point",
      dataIndex: "point",
      render: (point: number) => <p>IDR. {toDisplay(point)}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (imageUrl: string) => <Image src={imageUrl} />,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type: AwardType) => {
        let color = "magenta";

        if (type === AwardType.VOUCHER) {
          color = "blue";
        }

        if (type === AwardType.PRODUCT) {
          color = "volcano";
        }

        return <Tag color={color}>{type}</Tag>;
      },
    },
  ];

  useEffect(() => {
    if (data) {
      if (
        state.filter.current <
        data.data!.totalItems / state.filter.pageSize
      ) {
        refetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, queryClient, refetch]);

  useEffect(() => {
    if (isError && error?.code) {
      message.error(error.message);
    }
  }, [isError, error]);

  const { types, pointEnd, pointStart } = state.filter;

  return (
    <Card
      title={
        <Spin
          spinning={isFetching && !(isLoading || isPreviousData)}
          size="small"
        >
          Awards
        </Spin>
      }
    >
      <Space direction="vertical" className="w__100">
        <Space direction="vertical">
          <div>
            <h3>Point Needed</h3>
            <Slider
              min={100_000}
              max={5_000_000}
              marks={sliderMarks}
              range={{ draggableTrack: true }}
              defaultValue={[pointStart, pointEnd]}
              onAfterChange={onPointRangeChange}
              tipFormatter={(value: number | undefined) =>
                `IDR. ${toDisplay(value || 0)}`
              }
            />
          </div>
          <div>
            <h3>Award Type</h3>
            <Checkbox
              onChange={onCheckAllChange}
              checked={types?.length === awardTypes.length}
            >
              Check all
            </Checkbox>
            <Checkbox.Group
              options={awardTypes}
              value={types}
              onChange={onTypeChange}
            />
          </div>
        </Space>
        <Table<TAward>
          bordered
          rowKey="id"
          size="small"
          scroll={{ x: 1000 }}
          dataSource={!isError ? data?.data.items || [] : []}
          loading={isLoading || isPreviousData}
          columns={columns}
          pagination={{
            ...state.filter,
            total: data?.data?.totalItems || 0,
          }}
          onChange={onFilterChange}
        />
      </Space>
    </Card>
  );
};

export default HomePage;
