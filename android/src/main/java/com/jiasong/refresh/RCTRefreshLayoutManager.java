package com.jiasong.refresh;

import android.view.View;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.scroll.ReactScrollView;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;
import com.scwang.smartrefresh.layout.listener.SimpleMultiPurposeListener;
import java.util.Map;


public class RCTRefreshLayoutManager extends ViewGroupManager<RCTRefreshLayout> {

    private static final String onChangeOffsetEvent = "onChangeOffset";
    private static final String onChangeStateEvent = "onChangeState";

    @Override
    public String getName() {
        return "RCTRefreshLayout";
    }

    @Override
    protected RCTRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        RCTRefreshLayout refreshLayout = new RCTRefreshLayout(reactContext);
        refreshLayout.setEnableLoadMore(false);
        refreshLayout.setEnableRefresh(true);
        refreshLayout.setHeaderMaxDragRate(2);
        refreshLayout.setHeaderTriggerRate(1);
        refreshLayout.setDragRate((float) 0.5);
        refreshLayout.setEnableOverScrollDrag(true);
        refreshLayout.setEnablePureScrollMode(false);
        refreshLayout.setEnableOverScrollBounce(false);
        return refreshLayout;
    }

    @Override
    public void addView(RCTRefreshLayout parent, View child, int index) {
        if (child instanceof RCTRefreshHeader) {
            parent.setRefreshHeader((RCTRefreshHeader) child);
        } else if (child instanceof ReactScrollView){
            parent.setRefreshContent(child);
        }
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put(onChangeStateEvent, MapBuilder.of("registrationName", onChangeStateEvent))
                .put(onChangeOffsetEvent, MapBuilder.of("registrationName", onChangeOffsetEvent))
                .build();
    }

    @ReactProp(name = "headerHeight")
    public void setHeaderHeight(RCTRefreshLayout view, float headerHeight) {
        if (headerHeight != 0.0f) {
            view.setHeaderHeight(headerHeight);
        }
    }

    @ReactProp(name = "refreshing")
    public void setRefreshing(RCTRefreshLayout view, Boolean refreshing) {
        RefreshState newState = view.getState();
        if (refreshing && newState != RefreshState.Refreshing) {
            view.autoRefresh();
        } else if (!refreshing && newState == RefreshState.Refreshing) {
            view.finishRefresh();
        }
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext,final RCTRefreshLayout view) {

        /**
         * 必须设置OnRefreshListener，如果没有设置，
         * 则会自动触发finishRefresh
         *
         * OnRefreshListener和OnSimpleMultiPurposeListener
         * 中的onRefresh都会触发刷新，只需写一个即可
         */
        view.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(@NonNull RefreshLayout refreshLayout) {

            }
        });
        view.setOnMultiPurposeListener(new SimpleMultiPurposeListener() {

            private int getTargetId(){
                return view.getId();
            }

            private RCTEventEmitter getEventEmitter(){
                ThemedReactContext context = (ThemedReactContext) view.getContext();
                RCTEventEmitter eventEmitter = context.getJSModule(RCTEventEmitter.class);
                return eventEmitter;
            }

            @Override
            public void onHeaderMoving(RefreshHeader header, boolean isDragging, float percent, int offset, int headerHeight, int maxDragHeight) {
                RCTEventEmitter eventEmitter = getEventEmitter();
                WritableMap map =  new WritableNativeMap();
                map.putInt("offset", offset);
                eventEmitter.receiveEvent(getTargetId(), onChangeOffsetEvent, map);
            }

            @Override
            public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {
                RCTEventEmitter eventEmitter  = getEventEmitter();
                WritableMap map =  new WritableNativeMap();
                 if (newState == RefreshState.None) {
                    map.putInt("state", 1);
                    eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
                } else if (newState == RefreshState.PullDownToRefresh){
                     map.putInt("state", 1);
                     eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
                 } else if (newState == RefreshState.ReleaseToRefresh) {
                    map.putInt("state", 2);
                    eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
                } else if (newState == RefreshState.RefreshReleased){
                    map.putInt("state", 3);
                    eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
                } else if (newState == RefreshState.RefreshFinish){
                    map.putInt("state", 4);
                    eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
                }
            }

            @Override
            public void onHeaderReleased(RefreshHeader header, int headerHeight, int extendHeight) {

            }


            @Override
            public void onHeaderStartAnimator(RefreshHeader header, int headerHeight, int extendHeight) {

            }

            @Override
            public void onHeaderFinish(RefreshHeader header, boolean success) {

            }

        });
    }
}
