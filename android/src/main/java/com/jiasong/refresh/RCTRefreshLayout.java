package com.jiasong.refresh;

import android.support.annotation.NonNull;

import android.view.View;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.scroll.ReactScrollView;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;
import com.scwang.smartrefresh.layout.listener.SimpleMultiPurposeListener;
import com.scwang.smartrefresh.layout.util.SmartUtil;

public class RCTRefreshLayout extends SmartRefreshLayout {

    public static final String onChangeOffsetEvent = "onChangeOffset";
    public static final String onChangeStateEvent = "onChangeState";
    private ThemedReactContext mReactContext;
    private RCTEventEmitter eventEmitter;

    public RCTRefreshLayout(ThemedReactContext context) {
        super(context);
        mReactContext = context;
        eventEmitter = context.getJSModule(RCTEventEmitter.class);
        this.setEnableLoadMore(false);
        this.setHeaderMaxDragRate(2);
        this.setHeaderTriggerRate(1);
        this.setDragRate((float) 0.5);
        this.setEnableOverScrollDrag(true);
        this.setEnablePureScrollMode(false);
        this.setEnableOverScrollBounce(false);
        this.setOnRefreshListener(new RefreshListener());
        this.setOnMultiPurposeListener(new MultiPurposeListener());
    }

    @Override
    public void addView(View child, int index) {
        if (child instanceof RCTRefreshHeader) {
            this.setRefreshHeader((RCTRefreshHeader) child);
        } else if (child instanceof ReactScrollView) {
            this.setRefreshContent(child);
        }
    }


    public void setRefreshing(Boolean refreshing) {
        RefreshState newState = this.getState();
        if (refreshing && newState != RefreshState.Refreshing) {
            this.autoRefresh();
        } else if (!refreshing && newState == RefreshState.Refreshing) {
            this.finishRefresh();
        }
    }

    private int getTargetId() {
        return this.getId();
    }

    private class RefreshListener implements OnRefreshListener {
        @Override
        public void onRefresh(@NonNull RefreshLayout refreshLayout) {

        }
    }

    private class MultiPurposeListener extends SimpleMultiPurposeListener {

        @Override
        public void onHeaderMoving(RefreshHeader header, boolean isDragging, float percent, int offset,
                                   int headerHeight, int maxDragHeight) {
            WritableMap map = new WritableNativeMap();
            map.putDouble("offset", SmartUtil.px2dp(offset));
            eventEmitter.receiveEvent(getTargetId(), onChangeOffsetEvent, map);
        }

        @Override
        public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState,
                                   @NonNull RefreshState newState) {
            WritableMap map = new WritableNativeMap();
            if (newState == RefreshState.None) {
                map.putInt("state", 1);
                eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
            } else if (newState == RefreshState.PullDownToRefresh) {
                map.putInt("state", 1);
                eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
            } else if (newState == RefreshState.ReleaseToRefresh) {
                map.putInt("state", 2);
                eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
            } else if (newState == RefreshState.RefreshReleased) {
                map.putInt("state", 3);
                eventEmitter.receiveEvent(getTargetId(), onChangeStateEvent, map);
            } else if (newState == RefreshState.RefreshFinish) {
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
    }

}