package com.jiasong.refresh;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

import com.facebook.react.views.view.ReactViewGroup;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshKernel;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.constant.SpinnerStyle;


public class RCTRefreshHeader extends ReactViewGroup implements RefreshHeader {

    private RefreshKernel mRefreshKernel;


    public RCTRefreshHeader(Context context) {
        super(context);
        this.initView(context);
    }

    public RCTRefreshHeader(Context context, AttributeSet attrs) {
        super(context);
        this.initView(context);
    }
    public RCTRefreshHeader(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context);
        this.initView(context);
    }


    @Override
    public void onInitialized(@NonNull RefreshKernel kernel, int height, int extendHeight) {
        mRefreshKernel = kernel;
    }

    private void initView(Context context) {

    }

    @NonNull
    public View getView() {
        return this;  //真实的视图就是自己，不能返回null
    }

    @Override
    public SpinnerStyle getSpinnerStyle() {
        return SpinnerStyle.Translate; //指定为平移，不能null
    }

    @Override
    public void onStartAnimator(RefreshLayout layout, int headHeight, int maxDragHeight) {

    }

    @Override
    public int onFinish(RefreshLayout layout, boolean success) {
        return 500;//延迟500毫秒之后再弹回
    }

    @Override
    public void onStateChanged(RefreshLayout refreshLayout, RefreshState oldState, RefreshState newState) {

    }

    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }

    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {
    }

    @Override
    public void onMoving(boolean isDragging, float percent, int offset, int height, int maxDragHeight) {

    }

    @Override
    public void onReleased(@NonNull RefreshLayout refreshLayout, int height, int maxDragHeight) {

    }

    @Override
    public void setPrimaryColors(@ColorInt int ... colors){
    }

}
